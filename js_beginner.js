// // variable declaration
// console.log(z)
// var x = 1;
// const y = 2; // immutable
// let z = 3;

// if (x === y) {
//     console.log("equal")
// } else {
//     console.log("not equal")
// }

//array
const arr=[1,2,3,4,5]

//loop
for (let i=0;i<arr.length;i++) {
    console.log(arr[i])
}

const obj = {
    name: "Tung",
    age: 21,
    sayHello: function () {
        console.log("hello world")
    }
}

console.log(obj.name)
console.log(obj["age"])
obj.sayHello()

obj.address = {
    district: "Ba Dinh",
    city: "Ha Noi"
}

console.log(obj.address.district)