class Fraction:
    def __init__(self, num, den):
        self.num = num
        self.den = den

    def __str__(self):
        return str(self.num) + "/" + str(self.den)

    def __add__(self, other):
        temp_num = self.num * other.den + other.num * self.den
        temp_den = self.den * other.den

        return "{}/{}".format(temp_num, temp_den)
    
    def __sub__(self, other):
        temp_num = self.num * other.den - other.num * self.den
        temp_den = self.den * other.den

        return "{}/{}".format(temp_num, temp_den)
    def __mul__(self, other):
        temp_num = self.num * other.num
        temp_den = self.den * other.den

        return "{}/{}".format(temp_num, temp_den)
    def __truediv__(self, other):
        temp_num = self.num * other.den 
        temp_den = self.den * other.num

        return "{}/{}".format(temp_num, temp_den)
        
x = Fraction(3,4)
y = Fraction(5,6)
print(x)
print(y)
print(x+y)
print(x-y)
print(x*y)
print(x/y)
