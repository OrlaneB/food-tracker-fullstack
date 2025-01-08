import dateNode from "./dateNode.js"
import { DateTime } from "luxon";


export default class linkedList{
    constructor(date,numberBefore){

        const today = new dateNode(DateTime.fromISO(date).toISODate())
        this.head = today;
        this.tail = today;

        for(let i = 0; i<numberBefore ;i++){
           this.addDateBefore(true);
           this.addDateAfter(true);
        }

    }

    getDates(){
        const dateArray = [];

        let currentNode = this.head;

        while(currentNode.next){
            dateArray.push(currentNode.date);
            currentNode = currentNode.next;
        }

        return dateArray;
    }

    addDateBefore(construction=false){
        const date = DateTime.fromISO(this.head.date).minus({days:1}).toISODate();

        const newNode = new dateNode(date);
        //This node is head
        //The current head's prev is set to newNode
        //newNode's next is set to head
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;

        if(!construction && this.tail){
            const newTail = this.tail.prev;
            this.tail = newTail;
            newTail.next=null;
        }
    }

    addDateAfter(construction=false){
        const date = DateTime.fromISO(this.tail.date).plus({days:1}).toISODate();

        const newNode = new dateNode(date);
        //This node is tail
        //tail.next is set to newNode
        //newNode.prev is set to tail
        newNode.prev = this.tail;
        this.tail.next=newNode;
        this.tail = newNode;

        if(!construction && this.head){
            const newHead = this.head.next;
            newHead.prev=null;
            this.head = newHead;
        }
    }
}


// module.exports = linkedList;