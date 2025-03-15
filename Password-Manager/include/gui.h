#ifndef GUI_H
#define GUI_H

#include <string>

class GUI {
public:
    void start();
private:
    void addPassword(const std::string& masterPassword);
    void retrievePassword(const std::string& masterPassword);
};

#endif // GUI_H
