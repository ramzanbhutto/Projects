#include "gui.h"
#include "encryption.h"
#include <iostream>
#include <unordered_map>
#include <string>

std::unordered_map<std::string, std::string> passwordStore;

void GUI::start() {
    std::string masterPassword;
    
    std::cout << "Set your master password: ";
    std::cin >> masterPassword;

    while (true) {
        std::cout << "\nPassword Manager Menu:\n";
        std::cout << "1. Add Password\n";
        std::cout << "2. Retrieve Password\n";
        std::cout << "3. Exit\n";
        std::cout << "Enter your choice: ";
        
        int choice;
        std::cin >> choice;

        if (choice == 1) {
            addPassword(masterPassword);
        } else if (choice == 2) {
            retrievePassword(masterPassword);
        } else if (choice == 3) {
            break;
        } else {
            std::cout << "Invalid choice! Please try again.\n";
        }
    }
}

void GUI::addPassword(const std::string& masterPassword) {
    std::string site, username, password;
    
    std::cout << "Enter site: ";
    std::cin >> site;
    std::cout << "Enter username: ";
    std::cin >> username;
    std::cout << "Enter password: ";
    std::cin >> password;

    std::string encryptedPassword = Encryption::encrypt(password, masterPassword);
    passwordStore[site + ":" + username] = encryptedPassword;

    std::cout << "Password stored successfully!\n";
}

void GUI::retrievePassword(const std::string& masterPassword) {
    std::string site, username;
    
    std::cout << "Enter site: ";
    std::cin >> site;
    std::cout << "Enter username: ";
    std::cin >> username;

    std::string key = site + ":" + username;
    if (passwordStore.find(key) != passwordStore.end()) {
        std::string encryptedPassword = passwordStore[key];
        std::string decryptedPassword = Encryption::decrypt(encryptedPassword, masterPassword);
        std::cout << "Password for " << site << " (" << username << "): " << decryptedPassword << "\n";
    } else {
        std::cout << "No password found for the given site and username.\n";
    }
}
