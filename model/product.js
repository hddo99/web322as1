const products = 
{
    category:[],
    products:[],
    bestSeller:[],

    init()
    {
        // Category Product List
        this.category.push({title:"Valentine's Day",img_src:'img/val.jpg',url:'/', details:'Learn More'});
        this.category.push({title:"Tools",img_src:'img/tool.jpg',url:'/',  details:'See details'});
        this.category.push({title:"Nutrition Products",img_src:'img/fit.jpg',url:'/',  details:'Learn More'});
        this.category.push({title:"Cell Phones",img_src:'img/phone.jpg',url:'/',  details:'Shop now'});

        // Products
        this.products.push({title:'Magic Coffee Mugs',category:"Gifts for You",description:'Create a mesmerizing custom-printed magic photo mug with just a few clicks. You can directly design a magic mug online with us and get it gift-wrapped.',price:'C$16.99',img:'img/pro1.jpg',bestSeller: true});
        this.products.push({title:'Yeezey Tripple White',category:'Sneaker',description:'An all-white Primeknit upper with a white side stripe sits atop the model’s easily-recognizable Boost midsole. A semi-translucent outsole completes the look.',price:'C$1299',img:'img/pro2.jpg',bestSeller: true});
        this.products.push({title:'MacBook Pro 2015',category:'Computer Devices',description:"Apple's 15-inch MacBook Pro with Retina Display returns for 2015, this time with the power of the Force. This refreshed MacBook sports the company's innovative Force Touch trackpad, which can perform a host of pressure-sensitive commands.",price:'C$2299',img:'img/pro3.jpg',bestSeller: true});
        this.products.push({title:'KOUUNN Apple Watch',category:'Watch',description:"The sport wristband fits for apple watch series 1, series 2, series 3,series 4, series 5,Nike+, Sport, Edition. ",price:'C$15.99',img:'img/pro4.jpg',bestSeller: true});
        this.products.push({title:'Exercise Ball',category:'Exercising Tools',description:"RESPONSIBLE MATERIALS- Made from Professional Grade PVC materials that are nontoxic, BPA, Latex, heavy metal and phthalate FREE. Safe for you and your family!",price:'C$101.99',img:'img/pro5.jpg',bestSeller: true});
        this.products.push({title:'Resistance Exercise Bands',category:'Exercising Tools',description:"HIGH-LEVEL RESISTANCE WITH 3 DIFFERENT SIZES-The different sizes are useful for the various exercises and levels of difficulty , and easily switch between the 3 levels to your preference anytime.",price:'C$29.99',img:'img/pro6.jpg',bestSeller: true});
        
        this.products.push({title:'Cotton Men Shirt',category:"Fashion",description:'Made with perfect cotton, classic fit button-down non-iron poplin short sleeve sky blue gingham shirt',price:'C$25.99',img:'img/pro7.jpg',bestSeller: true});
        this.products.push({title:'Black Framed EyeClasses',category:'Accessories',description:'Square acetate optical glasses in black. Integrated nose pads. Metal trim in gold-tone featuring stripes in red and green at hinges. Logo etched in gold-tone at temples. Made in Italy',price:'C$299',img:'img/pro8.jpg',bestSeller: true});
        this.products.push({title:'Dolce Perfume for Women',category:'Fragance Oils',description:'The Dolce&Gabbana Light Blue perfumes represent the aroma of sparkling summer days yielding to evocative evenings. They describe a story in which man meets woman. Domenico Dolce and Stefano Gabbana are extremely proud of Light Blue’s legacy, which includes several perfume awards.',price:'C$399',img:'img/pro10.jpg',bestSeller: true});
        this.products.push({title:"Couple's Rings",category:'Valentine Presents',description:"COI Titanium Step Edges Wedding Band Ring.   Comfort fit with inside round shank.  A 100% tailor-made ring for you.  Classic with delicated details, unsurpassed quality plus incredible value! Perfect as a wedding band, engagement ring or just for everyday wear due to its extreme comfort!",price:'C$55.99',img:'img/pro9.jpg',bestSeller: true});
       
        // Classify products as best sellers
        this.products.forEach(item => {
            if (item.bestSeller == true) {
                this.bestSeller.push(item);
            }
        });
    },
    getCategory_list() {
        return this.category;
    },
    getBestseller_list() {
        return this.bestSeller;
    },
    getAllProducts()
    {
        return this.products;
    },
}
products.init();
module.exports=products;

