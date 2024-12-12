const Day = require("../client/src/utilities/classes/DayClass");

describe("The Day class", () => {
    let day;

    beforeEach(()=>{
        day = new Day("Wed Dec 11 2024 19:33:08 GMT+0100 (heure normale d’Europe centrale)")
    });
    
    test("the getDate function", ()=> {
        expect(day.getDate()).toBe("Wed Dec 11 2024 19:33:08 GMT+0100 (heure normale d’Europe centrale)");
    });

    test("the getTotalNutrients", ()=> {
        expect(day.getTotalNutrients()).toBeNull();
    });

    test("the getPercentageNutrients", ()=> {
        expect(day.getPercentageNutrients()).toBeNull();
    });

    test("the calculateTotalNutrients function", ()=>{
        const nutList = [
            [
              [
                { name: 'Energy', amount: 200 },
                { name: 'Protein', amount: 50 },
                { name: 'Carbohydrate, by difference', amount: 150 },
                { name: 'Total lipid (fat)', amount: 100 },
                { name: 'Fiber, total dietary', amount: 80 },
                { name: 'Total Sugars', amount: 60 },
                { name: 'Calcium, Ca', amount: 90 },
                { name: 'Iron, Fe', amount: 40 },
                { name: 'Potassium, K', amount: 120 },
                { name: 'Sodium, Na', amount: 70 },
                { name: 'Vitamin A, RAE', amount: 30 },
                { name: 'Vitamin C, total ascorbic acid', amount: 50 },
                { name: 'Vitamin D (D2 + D3)', amount: 20 },
                { name: 'Vitamin E (alpha-tocopherol)', amount: 25 },
                { name: 'Vitamin K (phylloquinone)', amount: 35 },
                { name: 'Magnesium, Mg', amount: 40 },
                { name: 'Zinc, Zn', amount: 45 },
                { name: 'Cholesterol', amount: 10 },
                { name: 'Folate, DFE', amount: 15 },
                { name: 'Fatty acids, total polyunsaturated', amount: 60 },
              ],
            ],
            [
              [
                { name: 'Energy', amount: 180 },
                { name: 'Protein', amount: 70 },
                { name: 'Carbohydrate, by difference', amount: 120 },
                { name: 'Total lipid (fat)', amount: 90 },
                { name: 'Fiber, total dietary', amount: 75 },
                { name: 'Total Sugars', amount: 55 },
                { name: 'Calcium, Ca', amount: 80 },
                { name: 'Iron, Fe', amount: 35 },
                { name: 'Potassium, K', amount: 100 },
                { name: 'Sodium, Na', amount: 60 },
                { name: 'Vitamin A, RAE', amount: 25 },
                { name: 'Vitamin C, total ascorbic acid', amount: 40 },
                { name: 'Vitamin D (D2 + D3)', amount: 15 },
                { name: 'Vitamin E (alpha-tocopherol)', amount: 20 },
                { name: 'Vitamin K (phylloquinone)', amount: 30 },
                { name: 'Magnesium, Mg', amount: 35 },
                { name: 'Zinc, Zn', amount: 40 },
                { name: 'Cholesterol', amount: 8 },
                { name: 'Folate, DFE', amount: 10 },
                { name: 'Fatty acids, total polyunsaturated', amount: 50 },
              ],
            ],
          ];

          const expected = [
            { name: 'Energy', amount: 380 },
            { name: 'Protein', amount: 120 },
            { name: 'Carbohydrate, by difference', amount: 270 },
            { name: 'Total lipid (fat)', amount: 190 },
            { name: 'Fiber, total dietary', amount: 155 },
            { name: 'Total Sugars', amount: 115 },
            { name: 'Calcium, Ca', amount: 170 },
            { name: 'Iron, Fe', amount: 75 },
            { name: 'Potassium, K', amount: 220 },
            { name: 'Sodium, Na', amount: 130 },
            { name: 'Vitamin A, RAE', amount: 55 },
            { name: 'Vitamin C, total ascorbic acid', amount: 90 },
            { name: 'Vitamin D (D2 + D3)', amount: 35 },
            { name: 'Vitamin E (alpha-tocopherol)', amount: 45 },
            { name: 'Vitamin K (phylloquinone)', amount: 65 },
            { name: 'Magnesium, Mg', amount: 75 },
            { name: 'Zinc, Zn', amount: 85 },
            { name: 'Cholesterol', amount: 18 },
            { name: 'Folate, DFE', amount: 25 },
            { name: 'Fatty acids, total polyunsaturated', amount: 110 },
          ];


          day.calculateTotalNutrients(nutList);



          day.getTotalNutrients().forEach(item=>{
            expect(item.amount).toBe(expected.find(e => e.name === item.name).amount);
          })

    })



    test("The calculatePercentage function", ()=>{

        const nutList = [
                    [
                      [
                        { name: 'Energy', amount: 200 },
                        { name: 'Protein', amount: 50 },
                        { name: 'Carbohydrate, by difference', amount: 150 },
                        { name: 'Total lipid (fat)', amount: 100 },
                        { name: 'Fiber, total dietary', amount: 80 },
                        { name: 'Total Sugars', amount: 60 },
                        { name: 'Calcium, Ca', amount: 90 },
                        { name: 'Iron, Fe', amount: 40 },
                        { name: 'Potassium, K', amount: 120 },
                        { name: 'Sodium, Na', amount: 70 },
                        { name: 'Vitamin A, RAE', amount: 30 },
                        { name: 'Vitamin C, total ascorbic acid', amount: 50 },
                        { name: 'Vitamin D (D2 + D3)', amount: 20 },
                        { name: 'Vitamin E (alpha-tocopherol)', amount: 25 },
                        { name: 'Vitamin K (phylloquinone)', amount: 35 },
                        { name: 'Magnesium, Mg', amount: 40 },
                        { name: 'Zinc, Zn', amount: 45 },
                        { name: 'Cholesterol', amount: 10 },
                        { name: 'Folate, DFE', amount: 15 },
                        { name: 'Fatty acids, total polyunsaturated', amount: 60 },
                      ],
                    ],
                    [
                      [
                        { name: 'Energy', amount: 180 },
                        { name: 'Protein', amount: 70 },
                        { name: 'Carbohydrate, by difference', amount: 120 },
                        { name: 'Total lipid (fat)', amount: 90 },
                        { name: 'Fiber, total dietary', amount: 75 },
                        { name: 'Total Sugars', amount: 55 },
                        { name: 'Calcium, Ca', amount: 80 },
                        { name: 'Iron, Fe', amount: 35 },
                        { name: 'Potassium, K', amount: 100 },
                        { name: 'Sodium, Na', amount: 60 },
                        { name: 'Vitamin A, RAE', amount: 25 },
                        { name: 'Vitamin C, total ascorbic acid', amount: 40 },
                        { name: 'Vitamin D (D2 + D3)', amount: 15 },
                        { name: 'Vitamin E (alpha-tocopherol)', amount: 20 },
                        { name: 'Vitamin K (phylloquinone)', amount: 30 },
                        { name: 'Magnesium, Mg', amount: 35 },
                        { name: 'Zinc, Zn', amount: 40 },
                        { name: 'Cholesterol', amount: 8 },
                        { name: 'Folate, DFE', amount: 10 },
                        { name: 'Fatty acids, total polyunsaturated', amount: 50 },
                      ],
                    ],
                  ];
        
                  const expected = [
                    { name: 'Energy', amount: 380 },
                    { name: 'Protein', amount: 120 },
                    { name: 'Carbohydrate, by difference', amount: 270 },
                    { name: 'Total lipid (fat)', amount: 190 },
                    { name: 'Fiber, total dietary', amount: 155 },
                    { name: 'Total Sugars', amount: 115 },
                    { name: 'Calcium, Ca', amount: 170 },
                    { name: 'Iron, Fe', amount: 75 },
                    { name: 'Potassium, K', amount: 220 },
                    { name: 'Sodium, Na', amount: 130 },
                    { name: 'Vitamin A, RAE', amount: 55 },
                    { name: 'Vitamin C, total ascorbic acid', amount: 90 },
                    { name: 'Vitamin D (D2 + D3)', amount: 35 },
                    { name: 'Vitamin E (alpha-tocopherol)', amount: 45 },
                    { name: 'Vitamin K (phylloquinone)', amount: 65 },
                    { name: 'Magnesium, Mg', amount: 75 },
                    { name: 'Zinc, Zn', amount: 85 },
                    { name: 'Cholesterol', amount: 18 },
                    { name: 'Folate, DFE', amount: 25 },
                    { name: 'Fatty acids, total polyunsaturated', amount: 110 },
                  ];
        
        
                  day.calculateTotalNutrients(nutList);

                  const chosenNutrients = [
                    {name : "Energy", goalAmount : 3800},
                    {name: "Protein", goalAmount : 120},
                    {name : "Carbohydrate, by difference", goalAmount:540}
                  ]


            day.calculatePercentage(chosenNutrients);


            expect(day.getPercentageNutrients()[0].percentage).toBe(10);
            expect(day.getPercentageNutrients()[1].percentage).toBe(100);
            expect(day.getPercentageNutrients()[2].percentage).toBe(50);
    })
})
