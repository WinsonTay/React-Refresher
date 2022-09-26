//Primitives

let age: number;
age = 12;

let userName: string;
userName="Hllo"

let isInstructor: boolean;
isInstructor = true


//More complex type
let hobbies: string[];

hobbies = ["Sports", "Cooking"]
type Person = {
    name:string,
    age:Number
}

let person:Person = {
    name:"Hello",
    age:32
}

let people: Person[] 


//Function & types
function added(a: number,b: number){
    return a + b;
}


//Generics
function insertAtBeginning<T>(array:T[], value:T){
    const newArray = [value,...array]
    return newArray
}
const demoArray = [1,2,,3]
const updatedArray = insertAtBeginning(demoArray,-1)
const stringArray = insertAtBeginning(['a','b','c'], 'd')

