cmake_minimum_required(VERSION 3.10)
project(PasswordManager)

set(CMAKE_CXX_STANDARD 17)

include_directories(include)

add_executable(PasswordManager src/main.cpp src/encryption.cpp)
