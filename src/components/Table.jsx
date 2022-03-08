import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import React, { useState } from "react";
import './Table.css';
import { ListGroupItem } from 'react-bootstrap';

class node
{
    
    constructor(key,value)
    {
             this.key = key
             this.value = value
             this.next = null
             this.prev = null
    }
}
class LRU
{
   
    constructor(capacity)
    {
        this.capacity = capacity
        this.left = new node(-1,-1)
        this.right = new node(-1,-1)
        this.left.next = this.right
        this.right.prev = this.left  
        this.cache = {}
    }

    view(start) {
        let output = []
        while(start!=null)
        {
            output.push(start.key)
            start = start.next
        }
        output.reverse()
        return output
        
    }
    remove(temp)
    { 
           temp.prev.next = temp.next
           temp.next.prev = temp.prev
    }
    add(temp)
    {
        let previous = this.right.prev
        previous.next = temp 
        this.right.prev = temp 
        temp.next = this.right 
        temp.prev = previous
    }
    get(key)
    { 
        if(key in this.cache)
        {
            var ans = this.cache[key].value
            this.remove(this.cache[key])
            this.add(this.cache[key])
            alert("value for the key "+ans)
            return
        }
        alert("key does not exist")
    }
    put(key,value)
    {
        if(key in this.cache)
            this.remove(this.cache[key])
        this.cache[key] = new node(key,value)
        this.add(this.cache[key])
        if(Object.keys(this.cache).length>this.capacity)
        { 
            delete this.cache[this.left.next.key]
            this.remove(this.left.next)        
        }
    }
}
let obj = null
function Table() {

    
    const [input,setInput] = useState({})
    const [arr,setArr] = useState([])
    

    function setCapacity()
    {
        
        setArr([])

        if( !input.capacity)
       {
        alert("Field Empty")
        return 
       }
        

        obj = new LRU(input.capacity)

        delete input.capacity

        setInput(values => ({...values,}))

        console.log("set")
    }

    function putt()
    {
        if(!obj)
       {
           alert("Set capacity")
           return
       }
       console.log("put key value")
       console.log(input.key2+" "+input.value2)
       
       if( !input.key2 || !input.value2 )
       {
        alert("Field Empty")
        return 
       }
       
       obj.put(input.key2,input.value2)
       console.log("cache "+obj.view(obj.left))
       setArr(obj.view(obj.left)) 
       
       delete input.key2
       delete input.value2
       
       setInput(values => ({...values,}))
    }
    function gett()
    {
       if(!obj)
       {
           alert("Set capacity")
           return
       }
       console.log("get key")
       console.log(input.key)

       if( !input.key)
       {
        alert("Field Empty")
        return 
       }
       obj.get(input.key)
       console.log("cache "+obj.view(obj.left))
       setArr(obj.view(obj.left)) 
       
       delete input.key
       setInput(values => ({...values,}))
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput(values => ({...values, [name]: value}))
      }
    
    return (

        <div className="outer-container">

        <div className='inner-container'>
            <InputGroup className="mb-3">
                
                <FormControl
                    placeholder='capacity'
                    value = {input.capacity || ""}
                    name={"capacity"}
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    onChange={handleChange}
                />
                <Button onClick={setCapacity} variant="outline-secondary" id="button-addon1">
                Set Capacity </Button>
            </InputGroup>


            <InputGroup className="mb-3">
                
                <FormControl
                    placeholder='key'
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    name = {"key2"}
                    value = {input.key2 || ""}
                    onChange={handleChange}
                />
                <FormControl
                    placeholder='value'
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    name = {"value2"}
                    value = {input.value2 || ""}
                    onChange ={handleChange}
                />
                <Button onClick={putt} variant="outline-secondary" id="button-addon1">
                    Put </Button>
            </InputGroup>


            <InputGroup className="mb-3">
                
                <FormControl
                    placeholder='key'
                    value = {input.key || ""}
                    name={"key"}
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    onChange={handleChange}
                />
                <Button onClick={gett} variant="outline-secondary" id="button-addon1">
                Get </Button>
            </InputGroup>
        </div>


            
            
           

            <div className="table-container">

                
                <ListGroup>
                    {
                        
                        
                        arr.length===0?(<ListGroupItem>{"cache is empty"}</ListGroupItem>):null
                    
                    }
                </ListGroup>


                <ListGroup>
                {arr.map((num,i)=>{

                    if(num!==-1)
                    return (
                        <ListGroup.Item key={i}>{num}</ListGroup.Item>
                    )
                })}
                </ListGroup>
            </div>
        </div>
    )
}


export default Table;