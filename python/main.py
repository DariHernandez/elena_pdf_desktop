import sys,json

# Read stanbdar input
data = sys.stdin.read()

# Return with satandar ouput
for item in list(data.split(',')): 
    print (item)

sys.stdout.flush()
