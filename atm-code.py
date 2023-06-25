class Atm:
    def __init__(self):
        self.pin = ""
        self.balance=0

        self.menu()

    def menu(self):
        user_input = input("""
            How you would like to Proceed ?
            1. Enter 1 to set Pin
            2. Enter 2 to deposit
            3. Enter 3 to withdraw 
            4. Enter 4 to show balance  
            5. Enter 5 to exit 
        """)

        if user_input == "1":
            self.set_pin()
        elif user_input == "2":
            self.deposite()
        elif user_input == "3":
            self.withdraw()
        elif user_input == "4":
            self.check_balance()
        elif user_input == "5":
            print("Bye")
        else:
            print("Something unexpected input, Please try again")
            self.menu()

    
    def set_pin(self):
        self.pin = input("Enter Your PIN")
        print(f"PIN setup is completed")
        self.menu()

    def deposite(self):
        temp = input("Enter your Pin")
        if temp == self.pin:
            amount = int(input("Enter the Amount"))
            self.balance += amount
            print(f"Deposite of {amount} amount is Successfull") 
        else:
            print("your Entered PIN is Invalid")
        self.menu()
        

    def withdraw(self):
        temp = input("Enter your PIN")
        if temp == self.pin:
            amount = int(input("Enter the Amount"))
            if amount < self.balance:
                self.balance -= amount
                print(f"Amount {amount} is withdraws successfull")
            else:
                print("Insufficient Balance")
        else:
            print("Invalid PIN")
        self.menu()



    def check_balance(self):
        temp = input("Enter your PIN")
        if temp == self.pin:
            print(f"Avaliable amount in the account is - {self.balance}")
        else:
            print("Invalid PIN")
        self.menu()
        

Sbi = Atm()