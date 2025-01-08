const linkedList = require("../client/src/utilities/calendar/linkedList");

describe("The linkedList", ()=> {

    describe("The constructor", ()=>{

        let list;

        beforeEach(()=>{
            list = new linkedList("2025-01-07",3);
        })


        test("Should have a head set to today's date -3",()=>{
            expect(list.head.date).toBe("2025-01-04");
        })

        test("Should have a tail set to today's date +3",()=>{
            expect(list.tail.date).toBe("2025-01-10");
        })

        test("Dates",()=>{
            expect(list.getDates()).toBe("yep");
        })

        
    })
})