const _ = require('lodash')

const departments = {
  _model: 'Department',
  1: { 
    name: 'Regional', 
    description: 'Proud of your country? Wear a T-shirt with a national symbol stamp!' 
  },
  2: { 
    name: 'Nature', 
    description: 'Find beautiful T-shirts with animals and flowers in our Nature department!' 
  },
  3: { 
    name: 'Seasonal', 
    description: 'Each time of the year has a special flavor. Our seasonal T-shirts express traditional symbols using unique postal stamp pictures.' 
  },
}

const categories = {
  _model: 'Category',
  1: {
    department: '->departments.1._id', 
    name: 'French', 
    description: 'The French have always had an eye for beauty. One look at the T-shirts below and you\'ll see that same appreciation has been applied abundantly to their postage stamps. Below are some of our most beautiful and colorful T-shirts, so browse away! And don\'t forget to go all the way to the bottom - you don\'t want to miss any of them!'
  },
  2: {
    department: '->departments.1._id',
    name: 'Italian',
    description: 'The full and resplendent treasure chest of art, literature, music, and science that Italy has given the world is reflected splendidly in its postal stamps. If we could, we would dedicate hundreds of T-shirts to this amazing treasure of beautiful images, but for now we will have to live with what you see here. You don\'t have to be Italian to love these gorgeous T-shirts, just someone who appreciates the finer things in life!'
  },
  3: {
    department: '->departments.1._id',
    name: 'Irish', 
    description: 'It was Churchill who remarked that he thought the Irish most curious because they didn\'t want to be English. How right he was! But then, he was half-American, wasn\'t he? If you have an Irish genealogy you will want these T-shirts! If you suddenly turn Irish on St. Patrick\'s Day, you too will want these T-shirts! Take a look at some of the coolest T-shirts we have!'
  },
  4: {
    department: '->departments.2._id',
    name: 'Animal', 
    description: 'Our ever-growing selection of beautiful animal T-shirts represents critters from everywhere, both wild and domestic. If you don\'t see the T-shirt with the animal you\'re looking for, tell us and we\'ll find it!'
  },
  5: {
    department: '->departments.2._id',
    name: 'Flower',
    description: 'These unique and beautiful flower T-shirts are just the item for the gardener, flower arranger, florist, or general lover of things beautiful. Surprise the flower in your life with one of the beautiful botanical T-shirts or just get a few for yourself!'
  },
  6: {
    department: '->departments.3._id',
    name: 'Christmas',
    description: 'Because this is a unique Christmas T-shirt that you\'ll only wear a few times a year, it will probably last for decades (unless some grinch nabs it from you, of course). Far into the future, after you\'re gone, your grandkids will pull it out and argue over who gets to wear it. What great snapshots they\'ll make dressed in Grandpa or Grandma\'s incredibly tasteful and unique Christmas T-shirt! Yes, everyone will remember you forever and what a silly goof you were when you would wear only your Santa beard and cap so you wouldn\'t cover up your nifty T-shirt.'
  },
  7: {
    department: '->departments.3._id',
    name: 'Valentine\'s',
    description: 'For the more timid, all you have to do is wear your heartfelt message to get it across. Buy one for you and your sweetie(s) today!'
  }
}

const products = {
  _model: 'Product',
  1: { name: 'Arc d\'Triomphe', description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.', price: 14.99, discountedPrice: 0.00, image: 'arc-d-triomphe.gif', image2: 'arc-d-triomphe-2.gif', thumbnail: 'arc-d-triomphe-thumbnail.gif', display: 0 },
  2: { name: 'Chartres Cathedral', description: '"The Fur Merchants". Not all the beautiful stained glass in the great cathedrals depicts saints and angels! Lay aside your furs for the summer and wear this beautiful T-shirt!', price: 16.95, discountedPrice: 15.95, image: 'chartres-cathedral.gif', image2: 'chartres-cathedral-2.gif', thumbnail: 'chartres-cathedral-thumbnail.gif', display: 2 },
  3: { name: 'Coat of Arms', description: 'There\'s good reason why the ship plays a prominent part on this shield!', price: 14.50, discountedPrice: 0.00, image: 'coat-of-arms.gif', image2: 'coat-of-arms-2.gif', thumbnail: 'coat-of-arms-thumbnail.gif', display: 0 },
  4: { name: 'Gallic Cock', description: 'This fancy chicken is perhaps the most beloved of all French symbols. Unfortunately, there are only a few hundred left, so you\'d better get your T-shirt now!', price: 18.99, discountedPrice: 16.99, image: 'gallic-cock.gif', image2: 'gallic-cock-2.gif', thumbnail: 'gallic-cock-thumbnail.gif', display: 2 },
  5: { name: 'Marianne', description: 'She symbolizes the "Triumph of the Republic" and has been depicted many different ways in the history of France, as you will see below!', price: 15.95, discountedPrice: 14.95, image: 'marianne.gif', image2: 'marianne-2.gif', thumbnail: 'marianne-thumbnail.gif', display: 2 },
  6: { name: 'Alsace', description: 'It was in this region of France that Gutenberg perfected his movable type. If he could only see what he started!', price: 16.50, discountedPrice: 0.00, image: 'alsace.gif', image2: 'alsace-2.gif', thumbnail: 'alsace-thumbnail.gif', display: 0 },
  7: { name: 'Apocalypse Tapestry', description: 'One of the most famous tapestries of the Loire Valley, it dates from the 14th century. The T-shirt is of more recent vintage, however.', price: 20.00, discountedPrice: 18.95, image: 'apocalypse-tapestry.gif', image2: 'apocalypse-tapestry-2.gif', thumbnail: 'apocalypse-tapestry-thumbnail.gif', display: 0 },
  8: { name: 'Centaur', description: 'There were never any lady centaurs, so these guys had to mate with nymphs and mares. No wonder they were often in such bad moods!', price: 14.99, discountedPrice: 0.00, image: 'centaur.gif', image2: 'centaur-2.gif', thumbnail: 'centaur-thumbnail.gif', display: 0 },
  9: { name: 'Corsica', description: 'Borrowed from Spain, the "Moor\'s head" may have celebrated the Christians\' victory over the Moslems in that country.', price: 22.00, discountedPrice: 0.00, image: 'corsica.gif', image2: 'corsica-2.gif', thumbnail: 'corsica-thumbnail.gif', display: 0 },
  10: { name: 'Haute Couture', description: 'This stamp publicized the dress making industry. Use it to celebrate the T-shirt industry!', price: 15.99, discountedPrice: 14.95, image: 'haute-couture.gif', image2: 'haute-couture-2.gif', thumbnail: 'haute-couture-thumbnail.gif', display: 3 },
  11: { name: 'Iris', description: 'Iris was the Goddess of the Rainbow, daughter of the Titans Thaumas and Electra. Are you up to this T-shirt?!', price: 17.50, discountedPrice: 0.00, image: 'iris.gif', image2: 'iris-2.gif', thumbnail: 'iris-thumbnail.gif', display: 0 },
  12: { name: 'Lorraine', description: 'The largest American cemetery in France is located in Lorraine and most of the folks there still appreciate that fact.', price: 16.95, discountedPrice: 0.00, image: 'lorraine.gif', image2: 'lorraine-2.gif', thumbnail: 'lorraine-thumbnail.gif', display: 0 },
  13: { name: 'Mercury', description: 'Besides being the messenger of the gods, did you know that Mercury was also the god of profit and commerce? This T-shirt is for business owners!', price: 21.99, discountedPrice: 18.95, image: 'mercury.gif', image2: 'mercury-2.gif', thumbnail: 'mercury-thumbnail.gif', display: 2 },
  14: { name: 'County of Nice', description: 'Nice is so nice that it has been fought over for millennia, but now it all belongs to France.', price: 12.95, discountedPrice: 0.00, image: 'county-of-nice.gif', image2: 'county-of-nice-2.gif', thumbnail: 'county-of-nice-thumbnail.gif', display: 0 },
  15: { name: 'Notre Dame', description: 'Commemorating the 800th anniversary of the famed cathedral.', price: 18.50, discountedPrice: 16.99, image: 'notre-dame.gif', image2: 'notre-dame-2.gif', thumbnail: 'notre-dame-thumbnail.gif', display: 2 },
  16: { name: 'Paris Peace Conference', description: 'The resulting treaties allowed Italy, Romania, Hungary, Bulgaria, and Finland to reassume their responsibilities as sovereign states in international affairs and thus qualify for membership in the UN.', price: 16.95, discountedPrice: 15.99, image: 'paris-peace-conference.gif', image2: 'paris-peace-conference-2.gif', thumbnail: 'paris-peace-conference-thumbnail.gif', display: 2 },
  17: { name: 'Sarah Bernhardt', description: 'The "Divine Sarah" said this about Americans: "You are younger than we as a race, you are perhaps barbaric, but what of it? You are still in the molding. Your spirit is superb. It is what helped us win the war." Perhaps we\'re still barbaric but we\'re still winning wars for them too!', price: 14.99, discountedPrice: 0.00, image: 'sarah-bernhardt.gif', image2: 'sarah-bernhardt-2.gif', thumbnail: 'sarah-bernhardt-thumbnail.gif', display: 0 },
  18: { name: 'Hunt', description: 'A scene from "Les Tres Riches Heures," a medieval "book of hours" containing the text for each liturgical hour of the day. This scene is from a 14th century painting.', price: 16.99, discountedPrice: 15.95, image: 'hunt.gif', image2: 'hunt-2.gif', thumbnail: 'hunt-thumbnail.gif', display: 2 },
  19: { name: 'Italia', description: 'The War had just ended when this stamp was designed, and even so, there was enough optimism to show the destroyed oak tree sprouting again from its stump! What a beautiful T-shirt!', price: 22.00, discountedPrice: 18.99, image: 'italia.gif', image2: 'italia-2.gif', thumbnail: 'italia-thumbnail.gif', display: 2 },
  20: { name: 'Torch', description: 'The light goes on! Carry the torch with this T-shirt and be a beacon of hope for the world!', price: 19.99, discountedPrice: 17.95, image: 'torch.gif', image2: 'torch-2.gif', thumbnail: 'torch-thumbnail.gif', display: 2 },
  21: { name: 'Espresso', description: 'The winged foot of Mercury speeds the Special Delivery mail to its destination. In a hurry? This T-shirt is for you!', price: 16.95, discountedPrice: 0.00, image: 'espresso.gif', image2: 'espresso-2.gif', thumbnail: 'espresso-thumbnail.gif', display: 0 },
  22: { name: 'Galileo', description: 'This beautiful T-shirt does honor to one of Italy\'s (and the world\'s) most famous scientists. Show your appreciation for the education you\'ve received!', price: 14.99, discountedPrice: 0.00, image: 'galileo.gif', image2: 'galileo-2.gif', thumbnail: 'galileo-thumbnail.gif', display: 0 },
  23: { name: 'Italian Airmail', description: 'Thanks to modern Italian post, folks were able to reach out and touch each other. Or at least so implies this image. This is a very fast and friendly T-shirt--you\'ll make friends with it!', price: 21.00, discountedPrice: 17.99, image: 'italian-airmail.gif', image2: 'italian-airmail-2.gif', thumbnail: 'italian-airmail-thumbnail.gif', display: 0 },
  24: { name: 'Mazzini', description: 'Giuseppe Mazzini is considered one of the patron saints of the "Risorgimiento." Wear this beautiful T-shirt to tell the world you agree!', price: 20.50, discountedPrice: 18.95, image: 'mazzini.gif', image2: 'mazzini-2.gif', thumbnail: 'mazzini-thumbnail.gif', display: 2 },
  25: { name: 'Romulus & Remus', description: 'Back in 753 BC, so the story goes, Romulus founded the city of Rome (in competition with Remus, who founded a city on another hill). Their adopted mother is shown in this image. When did they suspect they were adopted?', price: 17.99, discountedPrice: 16.95, image: 'romulus-remus.gif', image2: 'romulus-remus-2.gif', thumbnail: 'romulus-remus-thumbnail.gif', display: 2 },
  26: { name: 'Italy Maria', description: 'This beautiful image of the Virgin is from a work by Raphael, whose life and death it honors. It is one of our most popular T-shirts!', price: 14.00, discountedPrice: 0.00, image: 'italy-maria.gif', image2: 'italy-maria-2.gif', thumbnail: 'italy-maria-thumbnail.gif', display: 0 },
  27: { name: 'Italy Jesus', description: 'This image of Jesus teaching the gospel was issued to commemorate the third centenary of the "propagation of the faith." Now you can do your part with this T-shirt!', price: 16.95, discountedPrice: 0.00, image: 'italy-jesus.gif', image2: 'italy-jesus-2.gif', thumbnail: 'italy-jesus-thumbnail.gif', display: 0 },
  28: { name: 'St. Francis', description: 'Here St. Francis is receiving his vision. This dramatic and attractive stamp was issued on the 700th anniversary of that event.', price: 22.00, discountedPrice: 18.99, image: 'st-francis.gif', image2: 'st-francis-2.gif', thumbnail: 'st-francis-thumbnail.gif', display: 2 },
  29: { name: 'Irish Coat of Arms', description: 'This was one of the first stamps of the new Irish Republic, and it makes a T-shirt you\'ll be proud to wear on St. Paddy\'s Day!', price: 14.99, discountedPrice: 0.00, image: 'irish-coat-of-arms.gif', image2: 'irish-coat-of-arms-2.gif', thumbnail: 'irish-coat-of-arms-thumbnail.gif', display: 0 },
  30: { name: 'Easter Rebellion', description: 'The Easter Rebellion of 1916 was a defining moment in Irish history. Although only a few hundred participated and the British squashed it in a week, its leaders were executed, which galvanized the uncommitted.', price: 19.00, discountedPrice: 16.95, image: 'easter-rebellion.gif', image2: 'easter-rebellion-2.gif', thumbnail: 'easter-rebellion-thumbnail.gif', display: 2 },
  31: { name: 'Guiness', description: 'Class! Who is this man and why is he important enough for his own T-shirt?!', price: 15.00, discountedPrice: 0.00, image: 'guiness.gif', image2: 'guiness-2.gif', thumbnail: 'guiness-thumbnail.gif', display: 0 },
  32: { name: 'St. Patrick', description: 'This stamp commemorated the 1500th anniversary of the revered saint\'s death. Is there a more perfect St. Patrick\'s Day T-shirt?!', price: 20.50, discountedPrice: 17.95, image: 'st-patrick.gif', image2: 'st-patrick-2.gif', thumbnail: 'st-patrick-thumbnail.gif', display: 0 },
  33: { name: 'St. Peter', description: 'This T-shirt commemorates the holy year of 1950.', price: 16.00, discountedPrice: 14.95, image: 'st-peter.gif', image2: 'st-peter-2.gif', thumbnail: 'st-peter-thumbnail.gif', display: 2 },
  34: { name: 'Sword of Light', description: 'This was the very first Irish postage stamp, and what a beautiful and cool T-shirt it makes for the Irish person in your life!', price: 14.99, discountedPrice: 0.00, image: 'sword-of-light.gif', image2: 'sword-of-light-2.gif', thumbnail: 'sword-of-light-thumbnail.gif', display: 0 },
  35: { name: 'Thomas Moore', description: 'One of the greatest if not the greatest of Irish poets and writers, Moore led a very interesting life, though plagued with tragedy in a somewhat typically Irish way. Remember "The Last Rose of Summer"?', price: 15.95, discountedPrice: 14.99, image: 'thomas-moore.gif', image2: 'thomas-moore-2.gif', thumbnail: 'thomas-moore-thumbnail.gif', display: 2 },
  36: { name: 'Visit the Zoo', description: 'This WPA poster is a wonderful example of the art produced by the Works Projects Administration during the Depression years. Do you feel like you sometimes live or work in a zoo? Then this T-shirt is for you!', price: 20.00, discountedPrice: 16.95, image: 'visit-the-zoo.gif', image2: 'visit-the-zoo-2.gif', thumbnail: 'visit-the-zoo-thumbnail.gif', display: 2 },
  37: { name: 'Sambar', description: 'This handsome Malayan Sambar was a pain in the neck to get to pose like this, and all so you could have this beautiful retro animal T-shirt!', price: 19.00, discountedPrice: 17.99, image: 'sambar.gif', image2: 'sambar-2.gif', thumbnail: 'sambar-thumbnail.gif', display: 2 },
  38: { name: 'Buffalo', description: 'Of all the critters in our T-shirt zoo, this is one of our most popular. A classic animal T-shirt for an individual like yourself!', price: 14.99, discountedPrice: 0.00, image: 'buffalo.gif', image2: 'buffalo-2.gif', thumbnail: 'buffalo-thumbnail.gif', display: 0 },
  39: { name: 'Mustache Monkey', description: 'This fellow is more than equipped to hang out with that tail of his, just like you\'ll be fit for hanging out with this great animal T-shirt!', price: 20.00, discountedPrice: 17.95, image: 'mustache-monkey.gif', image2: 'mustache-monkey-2.gif', thumbnail: 'mustache-monkey-thumbnail.gif', display: 2 },
  40: { name: 'Colobus', description: 'Why is he called "Colobus," "the mutilated one"? He doesn\'t have a thumb, just four fingers! He is far from handicapped, however; his hands make him the great swinger he is. Speaking of swinging, that\'s what you\'ll do with this beautiful animal T-shirt!', price: 17.00, discountedPrice: 15.99, image: 'colobus.gif', image2: 'colobus-2.gif', thumbnail: 'colobus-thumbnail.gif', display: 2 },
  41: { name: 'Canada Goose', description: 'Being on a major flyway for these guys, we know all about these majestic birds. They hang out in large numbers on a lake near our house and fly over constantly. Remember what Frankie Lane said? "I want to go where the wild goose goes!" And when you go, wear this cool Canada goose animal T-shirt.', price: 15.99, discountedPrice: 0.00, image: 'canada-goose.gif', image2: 'canada-goose-2.gif', thumbnail: 'canada-goose-thumbnail.gif', display: 0 },
  42: { name: 'Congo Rhino', description: 'Among land mammals, this white rhino is surpassed in size only by the elephant. He has a big fan base too, working hard to make sure he sticks around. You\'ll be a fan of his, too, when people admire this unique and beautiful T-shirt on you!', price: 20.00, discountedPrice: 18.99, image: 'congo-rhino.gif', image2: 'congo-rhino-2.gif', thumbnail: 'congo-rhino-thumbnail.gif', display: 2 },
  43: { name: 'Equatorial Rhino', description: 'There\'s a lot going on in this frame! A black rhino is checking out that python slithering off into the bush--or is he eyeing you? You can bet all eyes will be on you when you wear this T-shirt!', price: 19.95, discountedPrice: 17.95, image: 'equatorial-rhino.gif', image2: 'equatorial-rhino-2.gif', thumbnail: 'equatorial-rhino-thumbnail.gif', display: 2 },
  44: { name: 'Ethiopian Rhino', description: 'Another white rhino is honored in this classic design that bespeaks the Africa of the early century. This pointillist and retro T-shirt will definitely turn heads!', price: 16.00, discountedPrice: 0.00, image: 'ethiopian-rhino.gif', image2: 'ethiopian-rhino-2.gif', thumbnail: 'ethiopian-rhino-thumbnail.gif', display: 0 },
  45: { name: 'Dutch Sea Horse', description: 'I think this T-shirt is destined to be one of our most popular simply because it is one of our most beautiful!', price: 12.50, discountedPrice: 0.00, image: 'dutch-sea-horse.gif', image2: 'dutch-sea-horse-2.gif', thumbnail: 'dutch-sea-horse-thumbnail.gif', display: 0 },
  46: { name: 'Dutch Swans', description: 'This stamp was designed in the middle of the Nazi occupation, as was the one above. Together they reflect a spirit of beauty that evil could not suppress. Both of these T-shirts will make it impossible to suppress your artistic soul, too!', price: 21.00, discountedPrice: 18.99, image: 'dutch-swans.gif', image2: 'dutch-swans-2.gif', thumbnail: 'dutch-swans-thumbnail.gif', display: 2 },
  47: { name: 'Ethiopian Elephant', description: 'From the same series as the Ethiopian Rhino and the Ostriches, this stylish elephant T-shirt will mark you as a connoisseur of good taste!', price: 18.99, discountedPrice: 16.95, image: 'ethiopian-elephant.gif', image2: 'ethiopian-elephant-2.gif', thumbnail: 'ethiopian-elephant-thumbnail.gif', display: 2 },
  48: { name: 'Laotian Elephant', description: 'This working guy is proud to have his own stamp, and now he has his own T-shirt!', price: 21.00, discountedPrice: 18.99, image: 'laotian-elephant.gif', image2: 'laotian-elephant-2.gif', thumbnail: 'laotian-elephant-thumbnail.gif', display: 0 },
  49: { name: 'Liberian Elephant', description: 'And yet another Jumbo! You need nothing but a big heart to wear this T-shirt (or a big sense of style)!', price: 22.00, discountedPrice: 17.50, image: 'liberian-elephant.gif', image2: 'liberian-elephant-2.gif', thumbnail: 'liberian-elephant-thumbnail.gif', display: 2 },
  50: { name: 'Somali Ostriches', description: 'Another in an old series of beautiful stamps from Ethiopia. These big birds pack quite a wallop, and so will you when you wear this uniquely retro T-shirt!', price: 12.95, discountedPrice: 0.00, image: 'somali-ostriches.gif', image2: 'somali-ostriches-2.gif', thumbnail: 'somali-ostriches-thumbnail.gif', display: 0 },
  51: { name: 'Tankanyika Giraffe', description: 'The photographer had to stand on a step ladder for this handsome portrait, but his efforts paid off with an angle we seldom see of this lofty creature. This beautiful retro T-shirt would make him proud!', price: 15.00, discountedPrice: 12.99, image: 'tankanyika-giraffe.gif', image2: 'tankanyika-giraffe-2.gif', thumbnail: 'tankanyika-giraffe-thumbnail.gif', display: 3 },
  52: { name: 'Ifni Fish', description: 'This beautiful stamp was issued to commemorate National Colonial Stamp Day (you can do that when you have a colony). When you wear this fancy fish T-shirt, your friends will think it\'s national T-shirt day!', price: 14.00, discountedPrice: 0.00, image: 'ifni-fish.gif', image2: 'ifni-fish-2.gif', thumbnail: 'ifni-fish-thumbnail.gif', display: 0 },
  53: { name: 'Sea Gull', description: 'A beautiful stamp from a small enclave in southern Morocco that belonged to Spain until 1969 makes a beautiful bird T-shirt.', price: 19.00, discountedPrice: 16.95, image: 'sea-gull.gif', image2: 'sea-gull-2.gif', thumbnail: 'sea-gull-thumbnail.gif', display: 2 },
  54: { name: 'King Salmon', description: 'You can fish them and eat them and now you can wear them with this classic animal T-shirt.', price: 17.95, discountedPrice: 15.99, image: 'king-salmon.gif', image2: 'king-salmon-2.gif', thumbnail: 'king-salmon-thumbnail.gif', display: 2 },
  55: { name: 'Laos Bird', description: 'This fellow is also known as the "White Crested Laughing Thrush." What\'s he laughing at? Why, at the joy of being on your T-shirt!', price: 12.00, discountedPrice: 0.00, image: 'laos-bird.gif', image2: 'laos-bird-2.gif', thumbnail: 'laos-bird-thumbnail.gif', display: 0 },
  56: { name: 'Mozambique Lion', description: 'The Portuguese were too busy to run this colony themselves so they gave the Mozambique Company a charter to do it. I think there must be some pretty curious history related to that (the charter only lasted for 50 years)! If you\'re a Leo, or know a Leo, you should seriously consider this T-shirt!', price: 15.99, discountedPrice: 14.95, image: 'mozambique-lion.gif', image2: 'mozambique-lion-2.gif', thumbnail: 'mozambique-lion-thumbnail.gif', display: 2 },
  57: { name: 'Peru Llama', description: 'This image is nearly 100 years old! Little did this little llama realize that he was going to be made immortal on the Web and on this very unique animal T-shirt (actually, little did he know at all)!', price: 21.50, discountedPrice: 17.99, image: 'peru-llama.gif', image2: 'peru-llama-2.gif', thumbnail: 'peru-llama-thumbnail.gif', display: 2 },
  58: { name: 'Romania Alsatian', description: 'If you know and love this breed, there\'s no reason in the world that you shouldn\'t buy this T-shirt right now!', price: 15.95, discountedPrice: 0.00, image: 'romania-alsatian.gif', image2: 'romania-alsatian-2.gif', thumbnail: 'romania-alsatian-thumbnail.gif', display: 0 },
  59: { name: 'Somali Fish', description: 'This is our most popular fish T-shirt, hands down. It\'s a beauty, and if you wear this T-shirt, you\'ll be letting the world know you\'re a fine catch!', price: 19.95, discountedPrice: 16.95, image: 'somali-fish.gif', image2: 'somali-fish-2.gif', thumbnail: 'somali-fish-thumbnail.gif', display: 2 },
  60: { name: 'Trout', description: 'This beautiful image will warm the heart of any fisherman! You must know one if you\'re not one yourself, so you must buy this T-shirt!', price: 14.00, discountedPrice: 0.00, image: 'trout.gif', image2: 'trout-2.gif', thumbnail: 'trout-thumbnail.gif', display: 0 },
  61: { name: 'Baby Seal', description: 'Ahhhhhh! This little harp seal would really prefer not to be your coat! But he would like to be your T-shirt!', price: 21.00, discountedPrice: 18.99, image: 'baby-seal.gif', image2: 'baby-seal-2.gif', thumbnail: 'baby-seal-thumbnail.gif', display: 2 },
  62: { name: 'Musk Ox', description: 'Some critters you just don\'t want to fool with, and if I were facing this fellow I\'d politely give him the trail! That is, of course, unless I were wearing this T-shirt.', price: 15.50, discountedPrice: 0.00, image: 'musk-ox.gif', image2: 'musk-ox-2.gif', thumbnail: 'musk-ox-thumbnail.gif', display: 0 },
  63: { name: 'Suvla Bay', description: ' In 1915, Newfoundland sent its Newfoundland Regiment to Suvla Bay in Gallipoli to fight the Turks. This classic image does them honor. Have you ever heard of them? Share the news with this great T-shirt!', price: 12.99, discountedPrice: 0.00, image: 'suvla-bay.gif', image2: 'suvla-bay-2.gif', thumbnail: 'suvla-bay-thumbnail.gif', display: 0 },
  64: { name: 'Caribou', description: 'There was a time when Newfoundland was a self-governing dominion of the British Empire, so it printed its own postage. The themes are as typically Canadian as can be, however, as shown by this "King of the Wilde" T-shirt!', price: 21.00, discountedPrice: 19.95, image: 'caribou.gif', image2: 'caribou-2.gif', thumbnail: 'caribou-thumbnail.gif', display: 2 },
  65: { name: 'Afghan Flower', description: 'This beautiful image was issued to celebrate National Teachers Day. Perhaps you know a teacher who would love this T-shirt?', price: 18.50, discountedPrice: 16.99, image: 'afghan-flower.gif', image2: 'afghan-flower-2.gif', thumbnail: 'afghan-flower-thumbnail.gif', display: 2 },
  66: { name: 'Albania Flower', description: 'Well, these crab apples started out as flowers, so that\'s close enough for us! They still make for a uniquely beautiful T-shirt.', price: 16.00, discountedPrice: 14.95, image: 'albania-flower.gif', image2: 'albania-flower-2.gif', thumbnail: 'albania-flower-thumbnail.gif', display: 2 },
  67: { name: 'Austria Flower', description: 'Have you ever had nasturtiums on your salad? Try it--they\'re almost as good as having them on your T-shirt!', price: 12.99, discountedPrice: 0.00, image: 'austria-flower.gif', image2: 'austria-flower-2.gif', thumbnail: 'austria-flower-thumbnail.gif', display: 0 },
  68: { name: 'Bulgarian Flower', description: 'For your interest (and to impress your friends), this beautiful stamp was issued to honor the George Dimitrov state printing works. You\'ll need to know this when you wear the T-shirt.', price: 16.00, discountedPrice: 14.99, image: 'bulgarian-flower.gif', image2: 'bulgarian-flower-2.gif', thumbnail: 'bulgarian-flower-thumbnail.gif', display: 2 },
  69: { name: 'Colombia Flower', description: 'Celebrating the 75th anniversary of the Universal Postal Union, a date to mark on your calendar and on which to wear this T-shirt!', price: 14.50, discountedPrice: 12.95, image: 'colombia-flower.gif', image2: 'colombia-flower-2.gif', thumbnail: 'colombia-flower-thumbnail.gif', display: 1 },
  70: { name: 'Congo Flower', description: 'The Congo is not at a loss for beautiful flowers, and we\'ve picked a few of them for your T-shirts.', price: 21.00, discountedPrice: 17.99, image: 'congo-flower.gif', image2: 'congo-flower-2.gif', thumbnail: 'congo-flower-thumbnail.gif', display: 2 },
  71: { name: 'Costa Rica Flower', description: 'This national flower of Costa Rica is one of our most beloved flower T-shirts (you can see one on Jill, above). You will surely stand out in this T-shirt!', price: 12.99, discountedPrice: 0.00, image: 'costa-rica-flower.gif', image2: 'costa-rica-flower.gif', thumbnail: 'costa-rica-flower-thumbnail.gif', display: 0 },
  72: { name: 'Gabon Flower', description: 'The combretum, also known as "jungle weed," is used in China as a cure for opium addiction. Unfortunately, when you wear this T-shirt, others may become hopelessly addicted to you!', price: 19.00, discountedPrice: 16.95, image: 'gabon-flower.gif', image2: 'gabon-flower-2.gif', thumbnail: 'gabon-flower-thumbnail.gif', display: 2 },
  73: { name: 'Ghana Flower', description: 'This is one of the first gingers to bloom in the spring--just like you when you wear this T-shirt!', price: 21.00, discountedPrice: 18.99, image: 'ghana-flower.gif', image2: 'ghana-flower-2.gif', thumbnail: 'ghana-flower-thumbnail.gif', display: 2 },
  74: { name: 'Israel Flower', description: 'This plant is native to the rocky and sandy regions of the western United States, so when you come across one, it really stands out. And so will you when you put on this beautiful T-shirt!', price: 19.50, discountedPrice: 17.50, image: 'israel-flower.gif', image2: 'israel-flower-2.gif', thumbnail: 'israel-flower-thumbnail.gif', display: 2 },
  75: { name: 'Poland Flower', description: 'A beautiful and sunny T-shirt for both spring and summer!', price: 16.95, discountedPrice: 15.99, image: 'poland-flower.gif', image2: 'poland-flower-2.gif', thumbnail: 'poland-flower-thumbnail.gif', display: 2 },
  76: { name: 'Romania Flower', description: 'Also known as the spring pheasant\'s eye, this flower belongs on your T-shirt this summer to help you catch a few eyes.', price: 12.95, discountedPrice: 0.00, image: 'romania-flower.gif', image2: 'romania-flower-2.gif', thumbnail: 'romania-flower-thumbnail.gif', display: 0 },
  77: { name: 'Russia Flower', description: 'Someone out there who can speak Russian needs to tell me what this plant is. I\'ll sell you the T-shirt for $10 if you can!', price: 21.00, discountedPrice: 18.95, image: 'russia-flower.gif', image2: 'russia-flower-2.gif', thumbnail: 'russia-flower-thumbnail.gif', display: 0 },
  78: { name: 'San Marino Flower', description: '"A white sport coat and a pink carnation, I\'m all dressed up for the dance!" Well, how about a white T-shirt and a pink carnation?!', price: 19.95, discountedPrice: 17.99, image: 'san-marino-flower.gif', image2: 'san-marino-flower-2.gif', thumbnail: 'san-marino-flower-thumbnail.gif', display: 2 },
  79: { name: 'Uruguay Flower', description: 'The Indian Queen Anahi was the ugliest woman ever seen. But instead of living a slave when captured by the Conquistadores, she immolated herself in a fire and was reborn the most beautiful of flowers: the ceibo, national flower of Uruguay. Of course, you won\'t need to burn to wear this T-shirt, but you may cause some pretty hot glances to be thrown your way!', price: 17.99, discountedPrice: 16.99, image: 'uruguay-flower.gif', image2: 'uruguay-flower-2.gif', thumbnail: 'uruguay-flower-thumbnail.gif', display: 2 },
  80: { name: 'Snow Deer', description: 'Tarmo has produced some wonderful Christmas T-shirts for us, and we hope to have many more soon.', price: 21.00, discountedPrice: 18.95, image: 'snow-deer.gif', image2: 'snow-deer-2.gif', thumbnail: 'snow-deer-thumbnail.gif', display: 2 },
  81: { name: 'Holly Cat', description: 'Few things make a cat happier at Christmas than a tree suddenly appearing in the house!', price: 15.99, discountedPrice: 0.00, image: 'holly-cat.gif', image2: 'holly-cat-2.gif', thumbnail: 'holly-cat-thumbnail.gif', display: 0 },
  82: { name: 'Christmas Seal', description: 'Is this your grandmother? It could be, you know, and I\'d bet she\'d recognize the Christmas seal on this cool Christmas T-shirt.', price: 19.99, discountedPrice: 17.99, image: 'christmas-seal.gif', image2: 'christmas-seal-2.gif', thumbnail: 'christmas-seal-thumbnail.gif', display: 2 },
  83: { name: 'Weather Vane', description: 'This weather vane dates from the 1830\'s and is still showing which way the wind blows! Trumpet your arrival with this unique Christmas T-shirt.', price: 15.95, discountedPrice: 14.99, image: 'weather-vane.gif', image2: 'weather-vane-2.gif', thumbnail: 'weather-vane-thumbnail.gif', display: 2 },
  84: { name: 'Mistletoe', description: 'This well-known parasite and killer of trees was revered by the Druids, who would go out and gather it with great ceremony. Youths would go about with it to announce the new year. Eventually more engaging customs were attached to the strange plant, and we\'re here to see that they continue with these cool Christmas T-shirts.', price: 19.00, discountedPrice: 17.99, image: 'mistletoe.gif', image2: 'mistletoe-2.gif', thumbnail: 'mistletoe-thumbnail.gif', display: 3 },
  85: { name: 'Altar Piece', description: 'This beautiful angel Christmas T-shirt is awaiting the opportunity to adorn your chest!', price: 20.50, discountedPrice: 18.50, image: 'altar-piece.gif', image2: 'altar-piece-2.gif', thumbnail: 'altar-piece-thumbnail.gif', display: 2 },
  86: { name: 'The Three Wise Men', description: 'This is a classic rendition of one of the season�s most beloved stories, and now showing on a Christmas T-shirt for you!', price: 12.99, discountedPrice: 0.00, image: 'the-three-wise-men.gif', image2: 'the-three-wise-men-2.gif', thumbnail: 'the-three-wise-men-thumbnail.gif', display: 0 },
  87: { name: 'Christmas Tree', description: 'Can you get more warm and folksy than this classic Christmas T-shirt?', price: 20.00, discountedPrice: 17.95, image: 'christmas-tree.gif', image2: 'christmas-tree-2.gif', thumbnail: 'christmas-tree-thumbnail.gif', display: 2 },
  88: { name: 'Madonna & Child', description: 'This exquisite image was painted by Filipino Lippi, a 15th century Italian artist. I think he would approve of it on a Going Postal Christmas T-shirt!', price: 21.95, discountedPrice: 18.50, image: 'madonna-child.gif', image2: 'madonna-child-2.gif', thumbnail: 'madonna-child-thumbnail.gif', display: 0 },
  89: { name: 'The Virgin Mary', description: 'This stained glass window is found in Glasgow Cathedral, Scotland, and was created by Gabriel Loire of France, one of the most prolific of artists in this medium--and now you can have it on this wonderful Christmas T-shirt.', price: 16.95, discountedPrice: 15.95, image: 'the-virgin-mary.gif', image2: 'the-virgin-mary-2.gif', thumbnail: 'the-virgin-mary-thumbnail.gif', display: 2 },
  90: { name: 'Adoration of the Kings', description: 'This design is from a miniature in the Evangelistary of Matilda in Nonantola Abbey, from the 12th century. As a Christmas T-shirt, it will cause you to be adored!', price: 17.50, discountedPrice: 16.50, image: 'adoration-of-the-kings.gif', image2: 'adoration-of-the-kings-2.gif', thumbnail: 'adoration-of-the-kings-thumbnail.gif', display: 2 },
  91: { name: 'A Partridge in a Pear Tree', description: 'The original of this beautiful stamp is by Jamie Wyeth and is in the National Gallery of Art. The next best is on our beautiful Christmas T-shirt!', price: 14.99, discountedPrice: 0.00, image: 'a-partridge-in-a-pear-tree.gif', image2: 'a-partridge-in-a-pear-tree-2.gif', thumbnail: 'a-partridge-in-a-pear-tree-thumbnail.gif', display: 0 },
  92: { name: 'St. Lucy', description: 'This is a tiny detail of a large work called "Mary, Queen of Heaven," done in 1480 by a Flemish master known only as "The Master of St. Lucy Legend." The original is in a Bruges church. The not-quite-original is on this cool Christmas T-shirt.', price: 18.95, discountedPrice: 0.00, image: 'st-lucy.gif', image2: 'st-lucy-2.gif', thumbnail: 'st-lucy-thumbnail.gif', display: 0 },
  93: { name: 'St. Lucia', description: 'Saint Lucia\'s tradition is an important part of Swedish Christmas, and an important part of that are the candles. Next to the candles in importance is this popular Christmas T-shirt!', price: 19.00, discountedPrice: 17.95, image: 'st-lucia.gif', image2: 'st-lucia-2.gif', thumbnail: 'st-lucia-thumbnail.gif', display: 2 },
  94: { name: 'Swede Santa', description: 'Santa as a child. You must know a child who would love this cool Christmas T-shirt!?', price: 21.00, discountedPrice: 18.50, image: 'swede-santa.gif', image2: 'swede-santa-2.gif', thumbnail: 'swede-santa-thumbnail.gif', display: 2 },
  95: { name: 'Wreath', description: 'Hey! I\'ve got an idea! Why not buy two of these cool Christmas T-shirts so you can wear one and tack the other one to your door?!', price: 18.99, discountedPrice: 16.99, image: 'wreath.gif', image2: 'wreath-2.gif', thumbnail: 'wreath-thumbnail.gif', display: 2 },
  96: { name: 'Love', description: 'Here\'s a Valentine\'s day T-shirt that will let you say it all in just one easy glance--there\'s no mistake about it!', price: 19.00, discountedPrice: 17.50, image: 'love.gif', image2: 'love-2.gif', thumbnail: 'love-thumbnail.gif', display: 2 },
  97: { name: 'Birds', description: 'Is your heart all aflutter? Show it with this T-shirt!', price: 21.00, discountedPrice: 18.95, image: 'birds.gif', image2: 'birds-2.gif', thumbnail: 'birds-thumbnail.gif', display: 2 },
  98: { name: 'Kat Over New Moon', description: 'Love making you feel lighthearted?', price: 14.99, discountedPrice: 0.00, image: 'kat-over-new-moon.gif', image2: 'kat-over-new-moon-2.gif', thumbnail: 'kat-over-new-moon-thumbnail.gif', display: 0 },
  99: { name: 'Thrilling Love', description: 'This girl\'s got her hockey hunk right where she wants him!', price: 21.00, discountedPrice: 18.50, image: 'thrilling-love.gif', image2: 'thrilling-love-2.gif', thumbnail: 'thrilling-love-thumbnail.gif', display: 2 },
  100: { name: 'The Rapture of Psyche', description: 'Now we\'re getting a bit more serious!', price: 18.95, discountedPrice: 16.99, image: 'the-rapture-of-psyche.gif', image2: 'the-rapture-of-psyche-2.gif', thumbnail: 'the-rapture-of-psyche-thumbnail.gif', display: 2 },
  101: { name: 'The Promise of Spring', description: 'With Valentine\'s Day come, can Spring be far behind?', price: 21.00, discountedPrice: 19.50, image: 'the-promise-of-spring.gif', image2: 'the-promise-of-spring-2.gif', thumbnail: 'the-promise-of-spring-thumbnail.gif', display: 0 },
}

const attributes = {
  _model: 'Attribute',
  1: { name: 'Size' },
  2: { name: 'Color' },
}

const attributeValues = {
  _model: 'AttributeValue',
  1: { attribute: '->attributes.1._id', value: 'S' },
  2: { attribute: '->attributes.1._id', value: 'M' },
  3: { attribute: '->attributes.1._id', value: 'L' },
  4: { attribute: '->attributes.1._id', value: 'XL' },
  5: { attribute: '->attributes.1._id', value: 'XXL' },
  6: { attribute: '->attributes.2._id', value: 'White' },
  7: { attribute: '->attributes.2._id', value: 'Black' },
  8: { attribute: '->attributes.2._id', value: 'Red' },
  9: { attribute: '->attributes.2._id', value: 'Orange' },
  10: { attribute: '->attributes.2._id', value: 'Yellow' },
  11: { attribute: '->attributes.2._id', value: 'Green' },
  12: { attribute: '->attributes.2._id', value: 'Blue' },
  13: { attribute: '->attributes.2._id', value: 'Indigo' },
  14: { attribute: '->attributes.2._id', value: 'Purple' },
}

const shippingRegions = {
  _model: 'ShippingRegion',
  1: { name: 'Please Select' },
  2: { name: 'US / Canada'},
  3: { name: 'Europe'},
  4: { name: 'Rest of World'},
}

const shippings = {
  _model: 'Shipping',
  1: { 
    name: 'Next Day Delivery ($20)', 
    cost: 20.00, 
    shippingRegion: '->shippingRegions.2._id' 
  },
  2: { 
    name: '3-4 Days ($10)', 
    cost: 10.00, 
    shippingRegion: '->shippingRegions.2._id' 
  },
  3: { 
    name: '7 Days ($5)', 
    cost: 5.00, 
    shippingRegion: '->shippingRegions.2._id' 
  },
  4: { 
    name: 'By air (7 days, $25)', 
    cost: 25.00, 
    shippingRegion: '->shippingRegions.3._id' 
  },
  5: { 
    name: 'By sea (28 days, $10)', 
    cost: 10.00, 
    shippingRegion: '->shippingRegions.3._id' 
  },
  6: { 
    name: 'By air (10 days, $35)', 
    cost: 35.00, 
    shippingRegion: '->shippingRegions.4._id' 
  },
  7: { 
    name: 'By sea (28 days, $30)', 
    cost: 30.00, 
    shippingRegion: '->shippingRegions.4._id' 
  },
}

Object.keys(products).forEach(key => {
  if (isNaN(key)) return
  const product = products[key]
  
  // product category

  product.categories = product.categories || []

  const i = Math.ceil(Math.random() * 7)
  product.categories.push(`->categories.${i}._id`)

  // product attributes
  
  product.attrs = product.attrs || []

  const sizes = [], colors = []
  for (let i = 0; i < 4; i++) {
    const s = Math.ceil(Math.random() * 5)
    const c = 5 + Math.ceil(Math.random() * 9)
    !sizes.includes(s) && sizes.push(s)
    !colors.includes(c) && colors.push(c)
  }
  product.attrs.push(...sizes.map(i => `->attributeValues.${i}._id`))
  product.attrs.push(...colors.map(i => `->attributeValues.${i}._id`))
})

module.exports = {
  attributes,
  attributeValues,
  departments,
  categories,
  shippingRegions,
  shippings,
  products,
}