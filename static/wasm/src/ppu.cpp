
#include <emscripten/emscripten.h>
#include "ppu.h"
#include "component.h"
#include "bus.h"
#include "cartridge.h"

EM_JS(void, JS_DRAW, (void * data), {
	UpdateComponent("screen", {data: data});
});

EM_JS(void, JS_PPU_PATTERN, (void * data, int index), {
	UpdateComponent("ppu", {pattern: data, index: index});
});

EM_JS(void, JS_PPU_PALETTE, (int r, int g, int b, int x, int y), {
	UpdateComponent("ppu", {r: r, g: g, b: b, x: x, y: y});
});

PPU::PPU(Bus * bus) : Component(bus) {

    this->_screen = (uint8_t*)calloc(340*260*4, sizeof(uint8_t));

    for(int i = 0; i < 340*260*4; i+=4) {
        uint8_t p = rand() * 255;
        this->_screen[i] = 0;
        this->_screen[i+1] = 0;
        this->_screen[i+2] = 0;
        this->_screen[i+3] = 0;
    }

    JS_DRAW(this->_screen);

    _palScreen[0x00] = Pixel(84, 84, 84);
	_palScreen[0x01] = Pixel(0, 30, 116);
	_palScreen[0x02] = Pixel(8, 16, 144);
	_palScreen[0x03] = Pixel(48, 0, 136);
	_palScreen[0x04] = Pixel(68, 0, 100);
	_palScreen[0x05] = Pixel(92, 0, 48);
	_palScreen[0x06] = Pixel(84, 4, 0);
	_palScreen[0x07] = Pixel(60, 24, 0);
	_palScreen[0x08] = Pixel(32, 42, 0);
	_palScreen[0x09] = Pixel(8, 58, 0);
	_palScreen[0x0A] = Pixel(0, 64, 0);
	_palScreen[0x0B] = Pixel(0, 60, 0);
	_palScreen[0x0C] = Pixel(0, 50, 60);
	_palScreen[0x0D] = Pixel(0, 0, 0);
	_palScreen[0x0E] = Pixel(0, 0, 0);
	_palScreen[0x0F] = Pixel(0, 0, 0);

	_palScreen[0x10] = Pixel(152, 150, 152);
	_palScreen[0x11] = Pixel(8, 76, 196);
	_palScreen[0x12] = Pixel(48, 50, 236);
	_palScreen[0x13] = Pixel(92, 30, 228);
	_palScreen[0x14] = Pixel(136, 20, 176);
	_palScreen[0x15] = Pixel(160, 20, 100);
	_palScreen[0x16] = Pixel(152, 34, 32);
	_palScreen[0x17] = Pixel(120, 60, 0);
	_palScreen[0x18] = Pixel(84, 90, 0);
	_palScreen[0x19] = Pixel(40, 114, 0);
	_palScreen[0x1A] = Pixel(8, 124, 0);
	_palScreen[0x1B] = Pixel(0, 118, 40);
	_palScreen[0x1C] = Pixel(0, 102, 120);
	_palScreen[0x1D] = Pixel(0, 0, 0);
	_palScreen[0x1E] = Pixel(0, 0, 0);
	_palScreen[0x1F] = Pixel(0, 0, 0);

	_palScreen[0x20] = Pixel(236, 238, 236);
	_palScreen[0x21] = Pixel(76, 154, 236);
	_palScreen[0x22] = Pixel(120, 124, 236);
	_palScreen[0x23] = Pixel(176, 98, 236);
	_palScreen[0x24] = Pixel(228, 84, 236);
	_palScreen[0x25] = Pixel(236, 88, 180);
	_palScreen[0x26] = Pixel(236, 106, 100);
	_palScreen[0x27] = Pixel(212, 136, 32);
	_palScreen[0x28] = Pixel(160, 170, 0);
	_palScreen[0x29] = Pixel(116, 196, 0);
	_palScreen[0x2A] = Pixel(76, 208, 32);
	_palScreen[0x2B] = Pixel(56, 204, 108);
	_palScreen[0x2C] = Pixel(56, 180, 204);
	_palScreen[0x2D] = Pixel(60, 60, 60);
	_palScreen[0x2E] = Pixel(0, 0, 0);
	_palScreen[0x2F] = Pixel(0, 0, 0);

	_palScreen[0x30] = Pixel(236, 238, 236);
	_palScreen[0x31] = Pixel(168, 204, 236);
	_palScreen[0x32] = Pixel(188, 188, 236);
	_palScreen[0x33] = Pixel(212, 178, 236);
	_palScreen[0x34] = Pixel(236, 174, 236);
	_palScreen[0x35] = Pixel(236, 174, 212);
	_palScreen[0x36] = Pixel(236, 180, 176);
	_palScreen[0x37] = Pixel(228, 196, 144);
	_palScreen[0x38] = Pixel(204, 210, 120);
	_palScreen[0x39] = Pixel(180, 222, 120);
	_palScreen[0x3A] = Pixel(168, 226, 144);
	_palScreen[0x3B] = Pixel(152, 226, 180);
	_palScreen[0x3C] = Pixel(160, 214, 228);
	_palScreen[0x3D] = Pixel(160, 162, 160);
	_palScreen[0x3E] = Pixel(0, 0, 0);
	_palScreen[0x3F] = Pixel(0, 0, 0);

}

void PPU::Tick(double delta) {

}

void PPU::Clock(long totalCycles) {

    auto IncrementScrollX = [&]()
	{
		// Note: pixel perfect scrolling horizontally is handled by the 
		// data shifters. Here we are operating in the spatial domain of 
		// tiles, 8x8 pixel blocks.
		
		// Ony if rendering is enabled
		if (mask.render_background || mask.render_sprites)
		{
			// A single name table is 32x30 tiles. As we increment horizontally
			// we may cross into a neighbouring nametable, or wrap around to
			// a neighbouring nametable
			if (vram_addr.coarse_x == 31)
			{
				// Leaving nametable so wrap address round
				vram_addr.coarse_x = 0;
				// Flip target nametable bit
				vram_addr.nametable_x = ~vram_addr.nametable_x;
			}
			else
			{
				// Staying in current nametable, so just increment
				vram_addr.coarse_x++;
			}
		}
	};

	// ==============================================================================
	// Increment the background tile "pointer" one scanline vertically
	auto IncrementScrollY = [&]()
	{

		if (mask.render_background || mask.render_sprites)
		{
			// If possible, just increment the fine y offset
			if (vram_addr.fine_y < 7)
			{
				vram_addr.fine_y++;
			}
			else
			{

				vram_addr.fine_y = 0;

				// Check if we need to swap vertical nametable targets
				if (vram_addr.coarse_y == 29)
				{
					// We do, so reset coarse y offset
					vram_addr.coarse_y = 0;
					// And flip the target nametable bit
					vram_addr.nametable_y = ~vram_addr.nametable_y;
				}
				else if (vram_addr.coarse_y == 31)
				{
					// In case the pointer is in the attribute memory, we
					// just wrap around the current nametable
					vram_addr.coarse_y = 0;
				}
				else
				{
					// None of the above boundary/wrapping conditions apply
					// so just increment the coarse y offset
					vram_addr.coarse_y++;
				}
			}
		}
	};

	auto TransferAddressX = [&]()
	{
		// Ony if rendering is enabled
		if (mask.render_background || mask.render_sprites)
		{
			vram_addr.nametable_x = tram_addr.nametable_x;
			vram_addr.coarse_x    = tram_addr.coarse_x;
		}
	};

	auto TransferAddressY = [&]()
	{
		// Ony if rendering is enabled
		if (mask.render_background || mask.render_sprites)
		{
			vram_addr.fine_y      = tram_addr.fine_y;
			vram_addr.nametable_y = tram_addr.nametable_y;
			vram_addr.coarse_y    = tram_addr.coarse_y;
		}
	};

	auto LoadBackgroundShifters = [&]()
	{	

		bg_shifter_pattern_lo = (bg_shifter_pattern_lo & 0xFF00) | bg_next_tile_lsb;
		bg_shifter_pattern_hi = (bg_shifter_pattern_hi & 0xFF00) | bg_next_tile_msb;

		bg_shifter_attrib_lo  = (bg_shifter_attrib_lo & 0xFF00) | ((bg_next_tile_attrib & 0b01) ? 0xFF : 0x00);
		bg_shifter_attrib_hi  = (bg_shifter_attrib_hi & 0xFF00) | ((bg_next_tile_attrib & 0b10) ? 0xFF : 0x00);
	};

	auto UpdateShifters = [&]()
	{
		if (mask.render_background)
		{
			// Shifting background tile pattern row
			bg_shifter_pattern_lo <<= 1;
			bg_shifter_pattern_hi <<= 1;

			// Shifting palette attributes by 1
			bg_shifter_attrib_lo <<= 1;
			bg_shifter_attrib_hi <<= 1;
		}

		if (mask.render_sprites && _cycle >= 1 && _cycle < 258)
		{
			for (int i = 0; i < sprite_count; i++)
			{
				if (spriteScanline[i].x > 0)
				{
					spriteScanline[i].x--;
				}
				else
				{
					sprite_shifter_pattern_lo[i] <<= 1;
					sprite_shifter_pattern_hi[i] <<= 1;
				}
			}
		}
	};

	

	// All but 1 of the secanlines is visible to the user. The pre-render scanline
	// at -1, is used to configure the "shifters" for the first visible scanline, 0.
	if (_scanline >= -1 && _scanline < 240)
	{		
		// Background Rendering ======================================================

		if (_scanline == 0 && _cycle == 0)
		{
			// "Odd Frame" cycle skip
			_cycle = 1;
		}

		if (_scanline == -1 && _cycle == 1)
		{
			// Effectively start of new frame, so clear vertical blank flag
			status.vertical_blank = 0;

			// Clear sprite overflow flag
			status.sprite_overflow = 0;
			
			// Clear the sprite zero hit flag
			status.sprite_zero_hit = 0;

			// Clear Shifters
			for (int i = 0; i < 8; i++)
			{
				sprite_shifter_pattern_lo[i] = 0;
				sprite_shifter_pattern_hi[i] = 0;
			}
		}


		if ((_cycle >= 2 && _cycle < 258) || (_cycle >= 321 && _cycle < 338))
		{
			UpdateShifters();
			
			switch ((_cycle - 1) % 8)
			{
			case 0:

				LoadBackgroundShifters();

				bg_next_tile_id = _PpuRead(0x2000 | (vram_addr.reg & 0x0FFF));

				break;
			case 2:
			
				bg_next_tile_attrib = _PpuRead(0x23C0 | (vram_addr.nametable_y << 11) 
					                                 | (vram_addr.nametable_x << 10) 
					                                 | ((vram_addr.coarse_y >> 2) << 3) 
					                                 | (vram_addr.coarse_x >> 2));
							
				if (vram_addr.coarse_y & 0x02) bg_next_tile_attrib >>= 4;
				if (vram_addr.coarse_x & 0x02) bg_next_tile_attrib >>= 2;
				bg_next_tile_attrib &= 0x03;
				break;

				// Compared to the last two, the next two are the easy ones... :P

			case 4: 

				bg_next_tile_lsb = _PpuRead((control.pattern_background << 12) 
					                       + ((uint16_t)bg_next_tile_id << 4) 
					                       + (vram_addr.fine_y) + 0);

				break;
			case 6:

				bg_next_tile_msb = _PpuRead((control.pattern_background << 12)
					                       + ((uint16_t)bg_next_tile_id << 4)
					                       + (vram_addr.fine_y) + 8);
				break;
			case 7:
				IncrementScrollX();
				break;
			}
		}

		if (_cycle == 256)
		{
			IncrementScrollY();
		}

		//...and reset the x position
		if (_cycle == 257)
		{
			LoadBackgroundShifters();
			TransferAddressX();
		}

		// Superfluous reads of tile id at end of scanline
		if (_cycle == 338 || _cycle == 340)
		{
			bg_next_tile_id = _PpuRead(0x2000 | (vram_addr.reg & 0x0FFF));
		}

		if (_scanline == -1 && _cycle >= 280 && _cycle < 305)
		{
			TransferAddressY();
		}

		if (_cycle == 257 && _scanline >= 0)
		{

			std::memset(spriteScanline, 0xFF, 8 * sizeof(sObjectAttributeEntry));

			sprite_count = 0;

			for (uint8_t i = 0; i < 8; i++)
			{
				sprite_shifter_pattern_lo[i] = 0;
				sprite_shifter_pattern_hi[i] = 0;
			}

			uint8_t nOAMEntry = 0;

			bSpriteZeroHitPossible = false;

			while (nOAMEntry < 64 && sprite_count < 9)
			{

				int16_t diff = ((int16_t)_scanline - (int16_t)OAM[nOAMEntry].y);

				if (diff >= 0 && diff < (control.sprite_size ? 16 : 8))
				{

					if (sprite_count < 8)
					{
						// Is this sprite sprite zero?
						if (nOAMEntry == 0)
						{
							// It is, so its possible it may trigger a 
							// sprite zero hit when drawn
							bSpriteZeroHitPossible = true;
						}

						memcpy(&spriteScanline[sprite_count], &OAM[nOAMEntry], sizeof(sObjectAttributeEntry));
						sprite_count++;
					}				
				}

				nOAMEntry++;
			} // End of sprite evaluation for next scanline

			status.sprite_overflow = (sprite_count > 8);

		}

		if (_cycle == 340)
		{
			// Now we're at the very end of the scanline, I'm going to prepare the 
			// sprite shifters with the 8 or less selected sprites.

			for (uint8_t i = 0; i < sprite_count; i++)
			{

				uint8_t sprite_pattern_bits_lo, sprite_pattern_bits_hi;
				uint16_t sprite_pattern_addr_lo, sprite_pattern_addr_hi;

				if (!control.sprite_size)
				{
					// 8x8 Sprite Mode - The control register determines the pattern table
					if (!(spriteScanline[i].attribute & 0x80))
					{
						// Sprite is NOT flipped vertically, i.e. normal    
						sprite_pattern_addr_lo = 
						  (control.pattern_sprite << 12  )  // Which Pattern Table? 0KB or 4KB offset
						| (spriteScanline[i].id   << 4   )  // Which Cell? Tile ID * 16 (16 bytes per tile)
						| (_scanline - spriteScanline[i].y); // Which Row in cell? (0->7)
												
					}
					else
					{
						// Sprite is flipped vertically, i.e. upside down
						sprite_pattern_addr_lo = 
						  (control.pattern_sprite << 12  )  // Which Pattern Table? 0KB or 4KB offset
						| (spriteScanline[i].id   << 4   )  // Which Cell? Tile ID * 16 (16 bytes per tile)
						| (7 - (_scanline - spriteScanline[i].y)); // Which Row in cell? (7->0)
					}

				}
				else
				{
					// 8x16 Sprite Mode - The sprite attribute determines the pattern table
					if (!(spriteScanline[i].attribute & 0x80))
					{
						// Sprite is NOT flipped vertically, i.e. normal
						if (_scanline - spriteScanline[i].y < 8)
						{
							// Reading Top half Tile
							sprite_pattern_addr_lo = 
							  ((spriteScanline[i].id & 0x01)      << 12)  // Which Pattern Table? 0KB or 4KB offset
							| ((spriteScanline[i].id & 0xFE)      << 4 )  // Which Cell? Tile ID * 16 (16 bytes per tile)
							| ((_scanline - spriteScanline[i].y) & 0x07 ); // Which Row in cell? (0->7)
						}
						else
						{
							// Reading Bottom Half Tile
							sprite_pattern_addr_lo = 
							  ( (spriteScanline[i].id & 0x01)      << 12)  // Which Pattern Table? 0KB or 4KB offset
							| (((spriteScanline[i].id & 0xFE) + 1) << 4 )  // Which Cell? Tile ID * 16 (16 bytes per tile)
							| ((_scanline - spriteScanline[i].y) & 0x07  ); // Which Row in cell? (0->7)
						}
					}
					else
					{
						// Sprite is flipped vertically, i.e. upside down
						if (_scanline - spriteScanline[i].y < 8)
						{
							// Reading Top half Tile
							sprite_pattern_addr_lo = 
							  ( (spriteScanline[i].id & 0x01)      << 12)    // Which Pattern Table? 0KB or 4KB offset
							| (((spriteScanline[i].id & 0xFE) + 1) << 4 )    // Which Cell? Tile ID * 16 (16 bytes per tile)
							| (7 - (_scanline - spriteScanline[i].y) & 0x07); // Which Row in cell? (0->7)
						}
						else
						{
							// Reading Bottom Half Tile
							sprite_pattern_addr_lo = 
							  ((spriteScanline[i].id & 0x01)       << 12)    // Which Pattern Table? 0KB or 4KB offset
							| ((spriteScanline[i].id & 0xFE)       << 4 )    // Which Cell? Tile ID * 16 (16 bytes per tile)
							| (7 - (_scanline - spriteScanline[i].y) & 0x07); // Which Row in cell? (0->7)
						}
					}
				}

				sprite_pattern_addr_hi = sprite_pattern_addr_lo + 8;

				sprite_pattern_bits_lo = _PpuRead(sprite_pattern_addr_lo);
				sprite_pattern_bits_hi = _PpuRead(sprite_pattern_addr_hi);

				if (spriteScanline[i].attribute & 0x40)
				{

					auto flipbyte = [](uint8_t b)
					{
						b = (b & 0xF0) >> 4 | (b & 0x0F) << 4;
						b = (b & 0xCC) >> 2 | (b & 0x33) << 2;
						b = (b & 0xAA) >> 1 | (b & 0x55) << 1;
						return b;
					};

					sprite_pattern_bits_lo = flipbyte(sprite_pattern_bits_lo);
					sprite_pattern_bits_hi = flipbyte(sprite_pattern_bits_hi);
				}

				sprite_shifter_pattern_lo[i] = sprite_pattern_bits_lo;
				sprite_shifter_pattern_hi[i] = sprite_pattern_bits_hi;
			}
		}
	}

	if (_scanline == 240)
	{

	}

	if (_scanline >= 241 && _scanline < 261)
	{
		if (_scanline == 241 && _cycle == 1)
		{

			status.vertical_blank = 1;
			if (control.enable_nmi) 
				_nmi = true;
		}
	}


    uint8_t bg_pixel = 0x00;   
	uint8_t bg_palette = 0x00; 

	if (mask.render_background)
	{

		uint16_t bit_mux = 0x8000 >> fine_x;

		uint8_t p0_pixel = (bg_shifter_pattern_lo & bit_mux) > 0;
		uint8_t p1_pixel = (bg_shifter_pattern_hi & bit_mux) > 0;

		bg_pixel = (p1_pixel << 1) | p0_pixel;

		uint8_t bg_pal0 = (bg_shifter_attrib_lo & bit_mux) > 0;
		uint8_t bg_pal1 = (bg_shifter_attrib_hi & bit_mux) > 0;
		bg_palette = (bg_pal1 << 1) | bg_pal0;
	}

	uint8_t fg_pixel = 0x00;   
	uint8_t fg_palette = 0x00; 
	uint8_t fg_priority = 0x00;
							 
	if (mask.render_sprites)
	{

		bSpriteZeroBeingRendered = false;

		for (uint8_t i = 0; i < sprite_count; i++)
		{

			if (spriteScanline[i].x == 0) 
			{

				uint8_t fg_pixel_lo = (sprite_shifter_pattern_lo[i] & 0x80) > 0;
				uint8_t fg_pixel_hi = (sprite_shifter_pattern_hi[i] & 0x80) > 0;
				fg_pixel = (fg_pixel_hi << 1) | fg_pixel_lo;

				fg_palette = (spriteScanline[i].attribute & 0x03) + 0x04;
				fg_priority = (spriteScanline[i].attribute & 0x20) == 0;

				if (fg_pixel != 0)
				{
					if (i == 0) 
					{
						bSpriteZeroBeingRendered = true;
					}

					break;
				}				
			}
		}		
	}

	uint8_t pixel = 0x00;  
	uint8_t palette = 0x00; 

	if (bg_pixel == 0 && fg_pixel == 0)
	{
		pixel = 0x00;
		palette = 0x00;
	}
	else if (bg_pixel == 0 && fg_pixel > 0)
	{
		pixel = fg_pixel;
		palette = fg_palette;
	}
	else if (bg_pixel > 0 && fg_pixel == 0)
	{
		pixel = bg_pixel;
		palette = bg_palette;
	}
	else if (bg_pixel > 0 && fg_pixel > 0)
	{
		if (fg_priority)
		{
			pixel = fg_pixel;
			palette = fg_palette;
		}
		else
		{
			pixel = bg_pixel;
			palette = bg_palette;
		}

		if (bSpriteZeroHitPossible && bSpriteZeroBeingRendered)
		{

			if (mask.render_background & mask.render_sprites)
			{

				if (~(mask.render_background_left | mask.render_sprites_left))
				{
					if (_cycle >= 9 && _cycle < 258)
					{
						status.sprite_zero_hit = 1;
					}
				}
				else
				{
					if (_cycle >= 1 && _cycle < 258)
					{
						status.sprite_zero_hit = 1;
					}
				}
			}
		}
	}

    Pixel p = GetColor(palette, pixel);

    int x = (_cycle - 1);
    int y = _scanline;

    int index = ((y * (340 * 4)) + (x * 4));

    if(index < 0 || index >= 340 * 260 * 4) {
        //printf("DRAW OUT OF BOUNDS (x: %i, y: %i)\n", x, y);
    } else {
        _screen[index] = p.r;
        _screen[index+1] = p.g;
        _screen[index+2] = p.b;
        _screen[index+3] = 255;
    }

	_cycle++;
	if (_cycle >= 341)
	{
		_cycle = 0;
		_scanline++;
		if (_scanline >= 261)
		{
			_scanline = -1;
		}
	}

}

void PPU::SetCart(Cartridge * cart) {
    _cart = cart;
}

uint8_t PPU::Read(uint16_t addr, bool readOnly) {

    uint8_t data = 0;

    addr &= 0x0007;

    readOnly = false;

    if(readOnly) {
        switch (addr)
		{
            case 0x0000: // Control
                data = control.reg;
                break;
            case 0x0001: // Mask
                data = mask.reg;
                break;
            case 0x0002: // Status
                data = status.reg;
                break;
            case 0x0003: // OAM Address
                break;
            case 0x0004: // OAM Data
                break;
            case 0x0005: // Scroll
                break;
            case 0x0006: // PPU Address
                break;
            case 0x0007: // PPU Data
                break;
		}
    } else {
        switch (addr)
        {
            case 0x0000: break;

            case 0x0001: break;
            
            case 0x0002:
                data = (status.reg & 0xE0) | (ppu_data_buffer & 0x1F);
                status.vertical_blank = 0;
                address_latch = 0;
                break;
            case 0x0003: break;

            case 0x0004: break;

            case 0x0005: break;

            case 0x0006: break;

            case 0x0007: 
                data = ppu_data_buffer;
                ppu_data_buffer = _PpuRead(vram_addr.reg);
                if (vram_addr.reg >= 0x3F00) data = ppu_data_buffer;
                vram_addr.reg += (control.increment_mode ? 32 : 1);
                
                break;
        }
    }
	
	return data;
}

void PPU::Write(uint16_t addr, uint8_t data) {

    addr &= 0x0007;

    switch (addr)
	{
	case 0x0000:
		control.reg = data;
		tram_addr.nametable_x = control.nametable_x;
		tram_addr.nametable_y = control.nametable_y;
		break;
	case 0x0001:
		mask.reg = data;
		break;
	case 0x0002:
		break;
	case 0x0003:
		break;
	case 0x0004:
		break;
	case 0x0005: 
		if (address_latch == 0)
		{
			fine_x = data & 0x07;
			tram_addr.coarse_x = data >> 3;
			address_latch = 1;
		}
		else
		{
			tram_addr.fine_y = data & 0x07;
			tram_addr.coarse_y = data >> 3;
			address_latch = 0;
		}
		break;
	case 0x0006:
		if (address_latch == 0)
		{
			tram_addr.reg = (uint16_t)((data & 0x3F) << 8) | (tram_addr.reg & 0x00FF);
			address_latch = 1;
		}
		else
		{
			tram_addr.reg = (tram_addr.reg & 0xFF00) | data;
			vram_addr = tram_addr;
			address_latch = 0;
		}
		break;
	case 0x0007: 
		_PpuWrite(vram_addr.reg, data);
		vram_addr.reg += (control.increment_mode ? 32 : 1);
		break;
	}

}

uint8_t PPU::_PpuRead(uint16_t addr) {
	uint8_t data = 0x00;
	addr &= 0x3FFF;
    
    if(_bus->Probe(addr)) {        
	    data = _bus->Read(addr);
    }
	else if (addr >= 0x0000 && addr <= 0x1FFF)
	{
		data = tblPattern[(addr & 0x1000) >> 12][addr & 0x0FFF];
	}
	else if (addr >= 0x2000 && addr <= 0x3EFF)
	{
		addr &= 0x0FFF;
        if(_cart->GetMirrorType() == EMirrorType::VERTICAL) {
            if (addr >= 0x0000 && addr <= 0x03FF)
                data = tblName[0][addr & 0x03FF];
            if (addr >= 0x0400 && addr <= 0x07FF)
                data = tblName[1][addr & 0x03FF];
            if (addr >= 0x0800 && addr <= 0x0BFF)
                data = tblName[0][addr & 0x03FF];
            if (addr >= 0x0C00 && addr <= 0x0FFF)
                data = tblName[1][addr & 0x03FF];            
        } else if(_cart->GetMirrorType() == EMirrorType::HORIZONTAL) {
            if (addr >= 0x0000 && addr <= 0x03FF)
                data = tblName[0][addr & 0x03FF];
            if (addr >= 0x0400 && addr <= 0x07FF)
                data = tblName[0][addr & 0x03FF];
            if (addr >= 0x0800 && addr <= 0x0BFF)
                data = tblName[1][addr & 0x03FF];
            if (addr >= 0x0C00 && addr <= 0x0FFF)
                data = tblName[1][addr & 0x03FF];            
        }

	}
	else if (addr >= 0x3F00 && addr <= 0x3FFF)
	{
		addr &= 0x001F;
		if (addr == 0x0010) addr = 0x0000;
		if (addr == 0x0014) addr = 0x0004;
		if (addr == 0x0018) addr = 0x0008;
		if (addr == 0x001C) addr = 0x000C;
		data = tblPalette[addr] & (mask.grayscale ? 0x30 : 0x3F);
	}

	return data;
}

void PPU::_PpuWrite(uint16_t addr, uint8_t data) {

    addr &= 0x3FFF;

	if (addr >= 0x0000 && addr <= 0x1FFF)
	{
		tblPattern[(addr & 0x1000) >> 12][addr & 0x0FFF] = data;
	}
	else if (addr >= 0x2000 && addr <= 0x3EFF)
	{
		addr &= 0x0FFF;
        if(_cart->GetMirrorType() == EMirrorType::VERTICAL) {
            if (addr >= 0x0000 && addr <= 0x03FF)
                tblName[0][addr & 0x03FF] = data;
            if (addr >= 0x0400 && addr <= 0x07FF)
                tblName[1][addr & 0x03FF] = data;
            if (addr >= 0x0800 && addr <= 0x0BFF)
                tblName[0][addr & 0x03FF] = data;
            if (addr >= 0x0C00 && addr <= 0x0FFF)
                tblName[1][addr & 0x03FF] = data;
        } else if(_cart->GetMirrorType() == EMirrorType::HORIZONTAL) {
            if (addr >= 0x0000 && addr <= 0x03FF)
                tblName[0][addr & 0x03FF] = data;
            if (addr >= 0x0400 && addr <= 0x07FF)
                tblName[0][addr & 0x03FF] = data;
            if (addr >= 0x0800 && addr <= 0x0BFF)
                tblName[1][addr & 0x03FF] = data;
            if (addr >= 0x0C00 && addr <= 0x0FFF)
                tblName[1][addr & 0x03FF] = data;
        }
    
	}
	else if (addr >= 0x3F00 && addr <= 0x3FFF)
	{
		addr &= 0x001F;
		if (addr == 0x0010) addr = 0x0000;
		if (addr == 0x0014) addr = 0x0004;
		if (addr == 0x0018) addr = 0x0008;
		if (addr == 0x001C) addr = 0x000C;
		tblPalette[addr] = data;
	}

}

Pixel PPU::GetColor(uint8_t palette, uint8_t pixel) {
    return _palScreen[_PpuRead(0x3F00 + (palette << 2) + pixel) & 0x3F];
}

void PPU::Draw() {
    _DrawPatternTables(3);
    _DrawPalettes();
}

bool PPU::IsNmi() {
    return _nmi;
}

void PPU::ClearNmi() {
    _nmi = false;
}

void PPU::_DrawPatternTables(uint8_t palette) {

    uint8_t pt0[128*128*4];
    uint8_t pt1[128*128*4];

    for (uint16_t nTileY = 0; nTileY < 16; nTileY++)
	{
		for (uint16_t nTileX = 0; nTileX < 16; nTileX++)
		{

			uint16_t nOffset = nTileY * 256 + nTileX * 16;

			for (uint16_t row = 0; row < 8; row++)
			{

				uint8_t tile_lsb_0 = _PpuRead(nOffset + row + 0x0000);
				uint8_t tile_msb_0 = _PpuRead(nOffset + row + 0x0008);

                uint8_t tile_lsb_1 = _PpuRead(0x1000 + nOffset + row + 0x0000);
				uint8_t tile_msb_1 = _PpuRead(0x1000 + nOffset + row + 0x0008);

				for (uint16_t col = 0; col < 8; col++)
				{

					uint8_t pixel_0 = (tile_lsb_0 & 0x01) + (tile_msb_0 & 0x01);
                    uint8_t pixel_1 = (tile_lsb_1 & 0x01) + (tile_msb_1 & 0x01);

					tile_lsb_0 >>= 1; tile_msb_0 >>= 1;
                    tile_lsb_1 >>= 1; tile_msb_1 >>= 1;

                    uint16_t x = nTileX * 8 + (7 - col);
                    uint16_t y = nTileY * 8 + row;

                    int index = ((y * (128 * 4)) + (x * 4));

                    Pixel p0 = GetColor(palette, pixel_0);
                    Pixel p1 = GetColor(palette, pixel_1);

                    pt0[index] = p0.r;
                    pt0[index+1] = p0.g;
                    pt0[index+2] = p0.b;
                    pt0[index+3] = 255;
                    
                    pt1[index] = p1.r;
                    pt1[index+1] = p1.g;
                    pt1[index+2] = p1.b;
                    pt1[index+3] = 255;

				}
			}
		}
	}

    JS_PPU_PATTERN(pt0, 0);
    JS_PPU_PATTERN(pt1, 1);

}

void PPU::_DrawPalettes() {
    for (int p = 0; p < 8; p++) {
        for(int s = 0; s < 4; s++) {
            Pixel pix = GetColor(p, s);
            JS_PPU_PALETTE(pix.r, pix.g, pix.b, p, s);
        }
    }
}
