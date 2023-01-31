import Realm from "realm";

export const TODO_SCHEMA = "Tasks2";

const TodoSchema = {
    name: TODO_SCHEMA,
    properties: {
    //   _id: "int",
      body: "string",
      expiry: "string",
      category:"string",
      status:"string?",
      user:"string",
    },
    primaryKey: "body",
};

const databaseOptions = {
    path: 'todoListApp.realm',
    schema: [TodoSchema]
}

export const insertNewTodo = newTodo => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(TODO_SCHEMA, newTodo);
            resolve(newTodo);
        })
    }).catch((error) => {
        reject(error);
    })
})

export const queryAllTodosStatusFalse = (username) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allTodos = realm.objects(TODO_SCHEMA).filtered("status=='false'").filtered(`user=='${username}'`)

        // console.log(allTodos);
        resolve(allTodos);
    }).catch(error => {
        reject(error);
    })
})

export const queryAllTodosStatusTrue = (username) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allTodos = realm.objects(TODO_SCHEMA).filtered("status=='true'").filtered(`user=='${username}'`)
        // console.log(allTodos);
        resolve(allTodos);
    }).catch(error => {
        reject(error);
    })
})

export const queryAllTodos = (username) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allTodos = realm.objects(TODO_SCHEMA).filtered(`user=='${username}'`)
        // console.log(allTodos);
        resolve(allTodos);
    }).catch(error => {
        reject(error);
    })
})

export const updateTodos = (mytodo) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        // console.log("nonFiltered",body);
        // let allTodos = realm.objects(TODO_SCHEMA).filtered("body == {body}");
        // let allTodos =realm.objectForPrimaryKey(TODO_SCHEMA,mytodo.body);
        // console.log("filtered",allTodos);
        // mytodo.forEach(todo=>{
        //     realm.write(() => {
        //         todo.status = JSON.stringify(!JSON.parse(todo.status))
        //     });
        // })

        realm.write(()=>{
            mytodo.status = JSON.stringify(!JSON.parse(mytodo.status))
        })
        
        resolve(mytodo);
    }).catch(error => {
        reject(error);
    })
})

// export const deleTodos = (mytodo) => new Promise((resolve, reject) => {
//     Realm.open(databaseOptions).then(realm => {
//         console.log("nonFiltered",body);
//         // let allTodos = realm.objects(TODO_SCHEMA).filtered("body == {body}");
//         // let allTodos =realm.objectForPrimaryKey(TODO_SCHEMA,mytodo.body);
//         realm.delete
//         console.log("filtered",allTodos);
//         allTodos.forEach(todo=>{
//             realm.write(() => {
//                 todo.status = JSON.stringify(!JSON.parse(todo.status))
//             });
//         })
//         resolve(allTodos);
//     }).catch(error => {
//         reject(error);
//     })
// })


