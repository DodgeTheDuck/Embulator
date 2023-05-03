
#include "component.h"

class Bus;
class Cartridge;

class Pixel {
public:
    Pixel() {};
    Pixel(uint8_t r, uint8_t g, uint8_t b) {
        this->r = r;
        this->g = g;
        this->b = b;
    }
    uint8_t r;
    uint8_t g;
    uint8_t b;
};

class PPU : public Component {

public:
    PPU(Bus * bus);

    virtual uint8_t Read(uint16_t addr, bool rdOnly = false);
	virtual void Write(uint16_t addr, uint8_t data);

	virtual void Tick(double delta);
	virtual void Clock(long totalCycles);

    void SetCart(Cartridge * cart);

    bool IsNmi();
    void ClearNmi();

    Pixel GetColor(uint8_t palette, uint8_t pixel);

    void Draw();

    uint8_t* pOAM = (uint8_t*)OAM;

private:

    uint8_t _PpuRead(uint16_t address);;
    void _PpuWrite(uint16_t address, uint8_t value);

    void _DrawPatternTables(uint8_t palette);
    void _DrawPalettes();

    uint8_t * _screen;

	uint8_t     tblName[2][1024];
	uint8_t     tblPattern[2][4096];
	uint8_t		tblPalette[32];

	struct sObjectAttributeEntry
	{
		uint8_t y;			// Y position of sprite
		uint8_t id;			// ID of tile from pattern memory
		uint8_t attribute;	// Flags define how sprite should be rendered
		uint8_t x;			// X position of sprite
	} OAM[64];

	uint8_t oam_addr = 0x00;


	sObjectAttributeEntry spriteScanline[8];
	uint8_t sprite_count;
	uint8_t sprite_shifter_pattern_lo[8];
	uint8_t sprite_shifter_pattern_hi[8];

	// Sprite Zero Collision Flags
	bool bSpriteZeroHitPossible = false;
	bool bSpriteZeroBeingRendered = false;

    union
	{
		struct
		{
			uint8_t unused : 5;
			uint8_t sprite_overflow : 1;
			uint8_t sprite_zero_hit : 1;
			uint8_t vertical_blank : 1;
		};

		uint8_t reg;
	} status;


	union
	{
		struct
		{
			uint8_t grayscale : 1;
			uint8_t render_background_left : 1;
			uint8_t render_sprites_left : 1;
			uint8_t render_background : 1;
			uint8_t render_sprites : 1;
			uint8_t enhance_red : 1;
			uint8_t enhance_green : 1;
			uint8_t enhance_blue : 1;
		};

		uint8_t reg;
	} mask;

	union PPUCTRL
	{
		struct
		{
			uint8_t nametable_x : 1;
			uint8_t nametable_y : 1;
			uint8_t increment_mode : 1;
			uint8_t pattern_sprite : 1;
			uint8_t pattern_background : 1;
			uint8_t sprite_size : 1;
			uint8_t slave_mode : 1; // unused
			uint8_t enable_nmi : 1;
		};

		uint8_t reg;
	} control;

	union loopy_register
	{
		// Credit to Loopy for working this out :D
		struct
		{

			uint16_t coarse_x : 5;
			uint16_t coarse_y : 5;
			uint16_t nametable_x : 1;
			uint16_t nametable_y : 1;
			uint16_t fine_y : 3;
			uint16_t unused : 1;
		};

		uint16_t reg = 0x0000;
	};
	
	
	loopy_register vram_addr; // Active "pointer" address into nametable to extract background tile info
	loopy_register tram_addr; // Temporary store of information to be "transferred" into "pointer" at various times

	// Pixel offset horizontally
	uint8_t fine_x = 0x00;

	// Internal communications
	uint8_t address_latch = 0x00;
	uint8_t ppu_data_buffer = 0x00;

	// Pixel "dot" position information
	int16_t _scanline = 0;
	int16_t _cycle = 0;

	// Background rendering
	uint8_t bg_next_tile_id     = 0x00;
	uint8_t bg_next_tile_attrib = 0x00;
	uint8_t bg_next_tile_lsb    = 0x00;
	uint8_t bg_next_tile_msb    = 0x00;
	uint16_t bg_shifter_pattern_lo = 0x0000;
	uint16_t bg_shifter_pattern_hi = 0x0000;
	uint16_t bg_shifter_attrib_lo  = 0x0000;
	uint16_t bg_shifter_attrib_hi  = 0x0000;

    Pixel _palScreen[0x40];

    Cartridge * _cart;

    bool _nmi;

};