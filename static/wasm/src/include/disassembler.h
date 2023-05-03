
#include <cstdint>
#include <vector>

class Bus;
class InstructionSet;
class CPU;

class Row {

public:
    Row(uint16_t address, const char* mnem) {
        this->address = address;
        this->mnem = mnem;
    }
    uint16_t address;
    const char * mnem;
};

class Disassembler {

public:
    Disassembler(CPU * cpu, Bus * bus, InstructionSet * is, int maxLength);
    void Run(uint16_t address);
    void AddBreakpoint(uint16_t address);
    void RemoveBreakpoint(uint16_t address);
    bool IsBreakpoint(uint16_t address);
    void Draw();

private:

    void _Traverse(uint16_t address);

    std::vector<uint16_t> _breakpoints;

    int _length;
    Bus * _bus;
    CPU * _cpu;
    InstructionSet * _is;
    Row ** _rows;

    bool _redrawRows;

};