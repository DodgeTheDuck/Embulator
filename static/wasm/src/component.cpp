
#include "component.h"
#include "bus.h"

Component::Component(Bus * bus) {
    _bus = bus;
}

Bus * Component::GetBus() {
    return this->_bus;
}