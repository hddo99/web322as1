const products = 
{
    category:[],
    products:[],
    bestSeller:[],

    init()
    {
        // Category Product List
        this.category.push({title:"Valentine's Day Presents",img_src:'img/val.jpg',url:'/', details:'Learn More'});
        this.category.push({title:"Tools for daily life",img_src:'img/tool.jpg',url:'/',  details:'See details'});
        this.category.push({title:"Nutritional products",img_src:'img/fit.jpg',url:'/',  details:'Learn More'});
        this.category.push({title:"Cell Phones ands Accessories",img_src:'img/phone.jpg',url:'/',  details:'Shop now'});

        // Products
        this.products.push({title:'Magic Coffee Mugs',category:"Gifts for You",description:'Create a mesmerizing custom-printed magic photo mug with just a few clicks. You can directly design a magic mug online with us and get it gift-wrapped.',price:'C$16.99',img:'img/pro1.jpg',bestSeller: true});
        this.products.push({title:'Yeezey Tripple White',category:'Sneaker',description:'An all-white Primeknit upper with a white side stripe sits atop the model’s easily-recognizable Boost midsole. A semi-translucent outsole completes the look.',price:'C$1299',img:'img/pro2.jpg',bestSeller: true});
        this.products.push({title:'MacBook Pro 2015',category:'Computer Devices',description:"Apple's 15-inch MacBook Pro with Retina Display returns for 2015, this time with the power of the Force. This refreshed MacBook sports the company's innovative Force Touch trackpad, which can perform a host of pressure-sensitive commands.",price:'C$2299',img:'img/pro3.jpg',bestSeller: true});
        this.products.push({title:'KOUUNN Compatible for Apple Watch',category:'Watch',description:"The sport wristband fits for apple watch series 1, series 2, series 3,series 4, series 5,Nike+, Sport, Edition. No buckle needed,adjustable magnet clasp design of the wristband, just easily stick and lock your watch band. Personalize your style and make your apple watch brand new.No problem for most occasion. The band comes with Watch Lugs on both ends, which locks onto Watch Interface precisely and securely, easy to install or remove. 100% KOUUNN Watch Band Guaranteed Product Satisfaction, 30 Days No Hassle Money Back and 1 Year Warranty",price:'C$15.99',img:'img/pro4.jpg',bestSeller: true});
        this.products.push({title:'Exercise Ball',category:'Exercising Tools',description:"RESPONSIBLE MATERIALS- Made from Professional Grade PVC materials that are nontoxic, BPA, Latex, heavy metal and phthalate FREE. Safe for you and your family! ANTI-BURST TESTED– Heavy duty PVC and a unique ridge guarantees every ball can withstand up to a 2cm cut while holding 600Lbs without explosively deflating. Strongest on the market! VERSATILE- Perfect for home exercise, yoga, pregnancy or to improve your core strength. Replace your office desk chair for improved posture and to relieve lower back pain. ALL INCLUSIVE – Includes a hand pump, 2 air plugs & valve remover tool. You also get access to our digital exercise guides and online training workouts 1 YEAR UNLIMTED WARRANTY - No Hassles, No Gimmicks If you’re not thrilled, simply contact our customer service team and we will make it right!",price:'C$101.99',img:'img/pro5.jpg',bestSeller: true});
        this.products.push({title:'Resistance Exercise Bands',category:'Exercising Tools',description:"HIGH-LEVEL RESISTANCE WITH 3 DIFFERENT SIZES-The different sizes are useful for the various exercises and levels of difficulty , and easily switch between the 3 levels to your preference anytime. NO ROLLING UP- Unlike latex resistance bands ,our soft fabric bands will not slide or roll up during workouts! Our bands are made with superior fabric with a very high breaking resistance, so you never have to worry about broken bands. WORKOUT COMPATIBILITY – POLYGON Bands are ideal for assisting in P90x, CrossFit, Yoga, Insanity, Pilates, Hot Yoga, and Beach Body workouts, You can use these amazing Booty Resistance Bands for pretty much all workout programs. EASY TO USE & CARRY - The best resistance band to carry anywhere and anytime whether you are traveling, at home, or at the gym. These resistance bands come with a travel pouch for easy carrying, which allows you to build muscles in any place. ",price:'C$29.99',img:'img/pro6.jpg',bestSeller: true});
       
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

