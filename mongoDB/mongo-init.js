db.examples.insert({
    "name": "bisection",
    "xl": 0,
    "xr": 1,
    "latex": "cos(x) - x * exp(x)",
  })
db.examples.insert({
    "name": "false",
    "xl": 0,
    "xr": 1,
    "latex": "cos(x) - x * exp(x)",
  })
db.examples.insert({
    "name": "newton_raphson",
    "x": 2,
    "latex": "3*x - cos(x) -1",
  })
db.examples.insert({
    "name": "onepoint",
    "x": 1,
    "latex": "(1+cos(x))/3",
  })
db.examples.insert({
    "name": "secant",
    "xl": 0,
    "xr": 1,
    "latex": "x*x*x - 2*x - 5",
  })
db.examples.insert({
    "name": "cramer",
    "arrayA": [
        [-2, 3, 1],
        [3, 4, -5],
        [1, -2, 1],
      ],
    "arrayB": [9, 0, -4],
  })
db.examples.insert({
    "name": "gauss_elimination",
    "arrayA": [
        [-2, 3, 1],
        [3, 4, -5],
        [1, -2, 1],
      ],
    "arrayB": [9, 0, -4],
  })
db.examples.insert({
    "name": "gauss_jordan",
    "arrayA": [
        [-2, 3, 1],
        [3, 4, -5],
        [1, -2, 1],
      ],
    "arrayB": [9, 0, -4],
  })
db.examples.insert({
    "name": "lu",
    "arrayA": [
        [-2, 3, 1],
        [3, 4, -5],
        [1, -2, 1],
      ],
    "arrayB": [9, 0, -4],
  })
db.examples.insert({
    "name": "jacobi",
    "arrayA": [
        [4, -4, 0],
        [-1, 4, -2],
        [0, -2, 4],
      ],
    "arrayB": [400, 400, 400],
    "arrayX": [0, 0, 0],
  })
db.examples.insert({
    "name": "seidel",
    "arrayA": [
        [4, -4, 0],
        [-1, 4, -2],
        [0, -2, 4],
      ],
    "arrayB": [400, 400, 400],
    "arrayX": [0, 0, 0],
  })
db.examples.insert({
    "name": "conjugate",
    "arrayA": [
        [5, 2, 0, 0],
        [2, 5, 2, 0],
        [0, 2, 5, 2],
        [0, 0, 2, 5],
      ],
    "arrayB": [12, 17, 14, 7],
  })
db.examples.insert({
    "name": "lagrange",
    "arrayX": [0, 20000, 40000, 60000, 80000],
    "arrayY": [9.81, 9.7487, 9.6879, 9.6879, 9.5682],
    "xfind": 42000,
  })
db.examples.insert({
    "name": "newton_divided",
    "arrayX": [0, 20000, 40000, 60000, 80000],
    "arrayY": [9.81, 9.7487, 9.6879, 9.6879, 9.5682],
    "xfind": 42000,
  })
db.examples.insert({
    "name": "spline",
    "arrayX": [0, 20000, 40000, 60000, 80000],
    "arrayY": [9.81, 9.7487, 9.6879, 9.6879, 9.5682],
    "xfind": 42000,
  })
db.examples.insert({
    "name": "linear",
    "arrayInput": [
        [10, 5],
        [15, 9],
        [20, 15],
        [30, 18],
        [40, 22],
        [50, 30],
        [60, 35],
        [70, 38],
        [80, 43],
      ],
  })
db.examples.insert({
    "name": "multiplelinear",
    "arrayInput": [
        [1, 0, 1, 4],
        [0, 1, 3, -5],
        [2, 4, 1, -6],
        [3, 2, 2, 0],
        [4, 1, 5, -1],
        [2, 3, 3, -7],
        [1, 6, 4, -20],
      ],
  })
db.examples.insert({
    "name": "polynomial",
    "arrayInput": [
        [10, 5],
        [15, 9],
        [20, 15],
        [30, 18],
        [40, 22],
        [50, 30],
        [60, 35],
        [70, 38],
        [80, 43],
      ],
  })