import express from 'express';
const router = express.Router();

// Fibonacci with descriptive explanation
const fibonacci = (n, animationStep = [], id = '0') => {
  if (n <= 1) {
    const node = {
      id,
      name: `fib(${n})`,
      value: n,
      explanation: `Base case reached: fib(${n}) = ${n}`,
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  const left = fibonacci(n - 1, animationStep, `${id}-0`);
  const right = fibonacci(n - 2, animationStep, `${id}-1`);
  const value = left.value + right.value;
  
  const node = {
    id,
    name: `fib(${n})`,
    value,
    explanation: `Recursive step: fib(${n}) = fib(${n-1}) + fib(${n-2}) = ${left.value} + ${right.value} = ${value}`,
    children: [left, right],
    isBaseCase: false
  };
  
  animationStep.push(node);
  return node;
};

// Factorial with descriptive explanation
const factorial = (n, animationStep = [], id = '0') => {
  if (n === 0 || n === 1) {
    const node = {
      id,
      name: `fact(${n})`,
      value: 1,
      explanation: `Base case reached: factorial(${n}) = 1`,
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  const child = factorial(n - 1, animationStep, `${id}-0`);
  const value = n * child.value;
  
  const node = {
    id,
    name: `fact(${n})`,
    value,
    explanation: `Recursive step: factorial(${n}) = ${n} × factorial(${n-1}) = ${n} × ${child.value} = ${value}`,
    children: [child],
    isBaseCase: false
  };
  
  animationStep.push(node);
  return node;
};

// Power function with descriptive explanation
const power = (base, exponent, animationStep = [], id = '0') => {
  if (exponent === 0) {
    const node = {
      id,
      name: `power(${base}, 0)`,
      value: 1,
      explanation: `Base case: any number raised to 0 equals 1`,
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  const child = power(base, exponent - 1, animationStep, `${id}-0`);
  const value = base * child.value;
  
  const node = {
    id,
    name: `power(${base}, ${exponent})`,
    value,
    explanation: `Recursive step: ${base}^${exponent} = ${base} × ${base}^${exponent-1} = ${base} × ${child.value} = ${value}`,
    children: [child],
    isBaseCase: false
  };
  
  animationStep.push(node);
  return node;
};

// GCD with descriptive explanation
const gcd = (a, b, animationStep = [], id = '0') => {
  if (b === 0) {
    const node = {
      id,
      name: `gcd(${a}, ${b})`,
      value: a,
      explanation: `Base case: since b = 0, GCD is ${a}`,
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  const child = gcd(b, a % b, animationStep, `${id}-0`);
  
  const node = {
    id,
    name: `gcd(${a}, ${b})`,
    value: child.value,
    explanation: `Recursive step: gcd(${a}, ${b}) = gcd(${b}, ${a % b}) = ${child.value}`,
    children: [child],
    isBaseCase: false
  };
  
  animationStep.push(node);
  return node;
};

// Binary Search with descriptive explanation
const binarySearch = (target, left, right, animationStep = [], id = '0') => {
  if (left > right) {
    const node = {
      id,
      name: `search(${target}, ${left}, ${right})`,
      value: -1,
      explanation: `Base case: range [${left}, ${right}] is invalid → target not found`,
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  const mid = Math.floor((left + right) / 2);

  if (mid === target) {
    const node = {
      id,
      name: `search(${target}, ${left}, ${right})`,
      value: mid,
      explanation: `Target found at index ${mid}`,
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  const nextChild = target < mid 
    ? binarySearch(target, left, mid - 1, animationStep, `${id}-0`)
    : binarySearch(target, mid + 1, right, animationStep, `${id}-1`);

  const node = {
    id,
    name: `search(${target}, ${left}, ${right})`,
    value: nextChild.value,
    explanation: `Check mid = ${mid}. Target ${target} is ${target < mid ? 'less' : 'greater'}, so search ${target < mid ? 'left' : 'right'} half`,
    children: [nextChild],
    isBaseCase: false
  };
  
  animationStep.push(node);
  return node;
};

// Array Sum with descriptive explanation
const arraySum = (arr, index = 0, animationStep = [], id = '0') => {
  if (index === arr.length) {
    const node = {
      id,
      name: `arraySum([${arr.join(',')}], ${index})`,
      value: 0,
      explanation: `Base case: reached end of array → sum = 0`,
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  const child = arraySum(arr, index + 1, animationStep, `${id}-0`);
  const value = arr[index] + child.value;
  
  const node = {
    id,
    name: `arraySum([${arr.join(',')}], ${index})`,
    value,
    explanation: `Recursive step: sum from index ${index} = arr[${index}] + sum(rest) = ${arr[index]} + ${child.value} = ${value}`,
    children: [child],
    isBaseCase: false
  };
  
  animationStep.push(node);
  return node;
};

// Tower of Hanoi with descriptive explanation
const towerOfHanoi = (n, source = 'A', auxiliary = 'B', target = 'C', animationStep = [], id = '0') => {
  if (n === 1) {
    const node = {
      id,
      name: `hanoi(${n})`,
      value: `Move disk 1: ${source} → ${target}`,
      explanation: `Base case: Move disk 1 directly from ${source} to ${target}`,
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  const child1 = towerOfHanoi(n - 1, source, target, auxiliary, animationStep, `${id}-0`);
  const moveCurrentDisk = {
    id: `${id}-move`,
    name: `Move disk ${n}`,
    value: `${source} → ${target}`,
    explanation: `Move disk ${n} from ${source} to ${target}`,
    children: [],
    isBaseCase: false
  };
  const child2 = towerOfHanoi(n - 1, auxiliary, source, target, animationStep, `${id}-1`);

  const node = {
    id,
    name: `hanoi(${n})`,
    value: `Solve ${n} disks: ${source} → ${target}`,
    explanation: `Recursive step: 1) Move ${n-1} disks from ${source} to ${auxiliary}, 2) Move disk ${n} from ${source} to ${target}, 3) Move ${n-1} disks from ${auxiliary} to ${target}`,
    children: [child1, moveCurrentDisk, child2],
    isBaseCase: false
  };

  animationStep.push(node);
  return node;
};

router.post('/', (req, res) => {
  try {
    const { functionName, input } = req.body;
    
    // console.log('Received request:', { functionName, input }); // Debug log
    
    if (!functionName || input === undefined) {
      throw new Error('Missing required parameters');
    }

    let result;
    let animationStep = [];

    switch (functionName) {
      case 'Fibonacci': {
        validateNumericInput(input);
        if(input<0)throw new Error('Fibonacci input must be non-negative');
        result = fibonacci(input, animationStep);
        break;
      }
      case 'Factorial': {
        validateNumericInput(input);
        if(input<0)throw new Error('Fibonacci input must be non-negative');
        result = factorial(input, animationStep);
        break;
      }
      case 'Power': {
        if (!Array.isArray(input) || input.length !== 2) {
          throw new Error('Power function requires base and exponent');
        }
        const [base, exponent] = input;
        validateNumericInput(base);
        validateNumericInput(exponent);
        if (exponent < 0) {
          throw new Error('Negative exponents are not supported in recursive implementation');
        }
        result = power(base, exponent, animationStep);
        break;
      }
      case 'GCD': {
        if (!Array.isArray(input) || input.length !== 2) {
          throw new Error('GCD function requires two numbers');
        }
        const [a, b] = input;
        validateNumericInput(a);
        validateNumericInput(b);
        if (a < 0 || b < 0) {
          throw new Error('GCD inputs must be non-negative integers');
        }
        result = gcd(a, b, animationStep);
        break;
      }
      case 'BinarySearch': {
        if (!Array.isArray(input) || input.length !== 2) {
          throw new Error('Binary Search requires target and maximum value');
        }
        const [target, max] = input;
        validateNumericInput(target);
        validateNumericInput(max);
         if (target < 0 || max < 0) {
          throw new Error('Binary Search requires non-negative integers');
        }
        if (target > max) {
          throw new Error(`Target ${target} cannot be greater than max value ${max}`);
        }
        result = binarySearch(target, 0, max, animationStep);
        break;
      }
      case 'ArraySum': {
        if (!Array.isArray(input)) {
          throw new Error('Array Sum requires an array of numbers');
        }
        if (input.length === 0) {
          throw new Error('Array Sum requires at least one element');
        }
        input.forEach(validateNumericInput);
        result = arraySum(input, 0, animationStep);
        break;
      }
      case 'TowerOfHanoi': {
        if (typeof input !== 'number' || !Number.isInteger(input)) {
          throw new Error('Input must be a valid integer');
        }
        if (input < 1 || input > 5) {
          throw new Error('Number of disks must be between 1 and 5');
        }
        result = towerOfHanoi(input, 'A', 'B', 'C', animationStep);
        break;
      }
      default:
        throw new Error(`Unsupported function: ${functionName}`);
    }
    
    // console.log('Sending response:', result); // Debug log
    res.json(result);
  } catch (error) {
    console.error('Backend Error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Add input validation helper if not already present
const validateNumericInput = (value) => {
  if (typeof value !== 'number' || isNaN(value) || !Number.isInteger(value)) {
    throw new Error('Input must be a valid integer');
  }
};

export default router;
