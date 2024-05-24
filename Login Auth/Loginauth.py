import hashlib

def register():
    username = input("Enter username: ")
    password = input("Enter password: ")

    # Hashing the password for security
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    # Storing the username and hashed password in a text file
    with open("users.txt", "a") as file:
        file.write(f"{username},{hashed_password}\n")

    print("Registration successful!")

def login():
    username = input("Enter username: ")
    password = input("Enter password: ")

    # Hashing the password for comparison
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    # Checking if the username and password match the records
    with open("users.txt", "r") as file:
        for line in file:
            stored_username, stored_password = line.strip().split(",")
            if username == stored_username and hashed_password == stored_password:
                print("Login successful!")
                return True

    print("Incorrect username or password.")
    return False

def secured_page():
    print("Welcome to the secured page!")

def main():
    while True:
        print("\n1. Register")
        print("2. Login")
        print("3. Exit")
        choice = input("Enter your choice: ")

        if choice == "1":
            register()
        elif choice == "2":
            if login():
                secured_page()
                break
        elif choice == "3":
            print("Exiting program.")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
