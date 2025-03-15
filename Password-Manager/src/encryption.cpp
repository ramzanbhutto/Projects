#include "encryption.h"
#include<string>

std::string Encryption::encrypt(const std::string& data,const std::string& key) {
    std::string encrypted = data;
    for (size_t i=0; i<data.length(); i++)
        encrypted[i]= data[i] ^ key[i % key.size()];

    return encrypted;
    
  std::string Encryption::decrypt(const std::string& data,const std::string& key) {
    return encrypt(data, key);
  }
}
