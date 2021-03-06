/*
 * Nam Pham's Photo Garden page
 * Development: Matthew Pham, Marcus Pham
 * Updated July 22, 2015
 *
 * Displays gallery of plant photos by genus.
 * Allows user to click on genus to see more plants,
 * as well as individual plants.
 *
 * Todo: Upload image files to server
 */


// Module pattern to encapsulate vars
(function() {

"use strict";

var MAX_GENUS = 12; // Constant number of genuses to be displayed

var photoArray = {}; // Psuedo-JSON Object
var images = []; // Array of image objects

window.onload = function() {
	parseFileToJSON();
	displayPhotos();
	toggleGenus();
};

// Loops through genuses and images to sort images into respective genus containers
// corresponding to the images appropriate genus
function displayPhotos() {
	var keys = Object.keys(photoArray);
	for (var i = 0; i < MAX_GENUS; i++) {
		var genus = keys[i];
		$("#photo-container").append('<div class="genus-container" name="' + genus + '"</div>');
		$(".genus-container:last-of-type").append('<span class="genus">' + genus + '</span>');
		
		/*
		// Adjust text in spans to fit divs
		var adjustTextSize = function() {
			var objSpan = $('.genus:last-of-type');  
			var intDivWidth = $('.genus-container:last-of-type').width();  
			var intResultSize;  
			for (var intFontSize = 1; intFontSize < 100; intFontSize++)  {
  				objSpan.css('font-size', intFontSize);  
  				if (objSpan.width() > intDivWidth) {  
    				intResultSize = intFontSize - 1;  
    				break;  
  				}  
			}
			objSpan.css('font-size', intResultSize);
		}
		adjustTextSize();
		*/
		
		// Append the images to the div
		for (var j = 0; j < photoArray[genus].length; j++) {
			var img = $(document.createElement('img'));
			img.attr('src', 'img/' + genus + '/' + photoArray[genus][j]);
			$(".genus-container:last-of-type").append(img);
			// Upon clicking upon an image in the Description div,
			// will bring up modal with title Genus and larger picture
			$("#description").on("click", "img", function() {
				var modalImage = $(this).clone();
				modalImage.addClass('modal-img');
				var modalBody = $('.modal-body');
				$('.modal-title').text($(this).parent().attr('name'));
				// The list of fun facts
				var funFacts = [
					"Fruit is a botanical term and Vegetable is a culinary term, so certain vegetation such as tomatoes, green beans, eggplants, and cucumbers could be called either fruits or vegetables.",
					"A herb is specifically from the leaf of a plant, and a spice is from the seed, berry, stem, bark, root or bulb.",
					"Plants are capable of recognizing their siblings and will give them preferential treatment, competing less for valuable resources like root space than when surrounded by plants that are strangers.",
					'One third of the plant life on the island of Socotra near Yemen can’t be found anywhere else on Earth. It has been described as "most alien-looking place on Earth".',
					"Scientists were able to revive a flowering plant from the fossilized fruit found in the stomach of an Arctic ground squirrel who was trapped in ice around 32,000 years ago.",
					"There’s a garden in England dedicated to plants that kill.",
					"Caffeine evolved as a natural insecticide. It paralyzes and kills insects that attempt to feed on the plants containing the chemical.",
					"Cabbage, kale, cauliflower, Brussels sprouts, broccoli, Chinese cabbage and savoy are all the same species of plant, but are so selectively bred that they no longer resemble one another.",
					"Native Americans planted corn, beans, and squash together because corn provides a structure for the beans to climb, beans provide the nitrogen to the soil that the other plants utilize, and the squash spreads along the ground preventing weeds.",
					"The smell of freshly cut grass is actually a plant distress call.",
					"When some plants are being eaten by caterpillars, they send chemical signals to parasitic wasps who swarm and attack the caterpillars.",
					"Mustard and wasabi aren’t spicy until they are crushed. When the plant’s cells are damaged, two otherwise harmless components mix and produce allyl isothiocyanate, the compound responsible for the familiar pungent taste.",
					"The entire dandelion plant is edible. Its leaves provide your recommended daily intake of Vitamin K, its flowers can be used to make wine, its root can be used to make a brewed drink that tastes a bit like coffee, and its also used in several soft drinks.",
					"Figs are not always considered vegan. When pollinated by a fig-wasp, the fig’s inward facing flowers trap the wasp, and the corpse is digested by enzymes in the fig.",
					"A Bonsai Orange Tree will actually produce tiny oranges.",
					"The average tree is made up of 99% dead cells. The only living parts are the leaves, root tips, and phloem, which is a thin layer of under bark that acts as a food delivery system.",
					"The heaviest tree in the world is also the heaviest single organism. It’s an entire forest in Utah, made up of one single tree, called a Quaking Aspen. It weights 6,000,000 Kg.",
					"The locations of the oldest tree in the world, Methuselah, and the tallest tree in the world, Hyperion, are closely guarded secrets. Only a handful of scientists know the exact locations of the trees."
				];
				var randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

				modalBody.text('');
				modalBody.append(modalImage);
				modalBody.append('<h2>Freshly-Picked Fun Fact! :D</h2>');
				modalBody.append('<p>' + randomFact + '</p>');

				var modal = $('#photo-modal');
				modal.show();
				$('.close-modal').click(function() { modal.hide() });
			});
		}
	}

}

// Fills the description div with cloned genus-container and title
// Clicking on the same genus-container as in Description div will do nothing
// Clicking on a different genus-container will replace elements in 
// the Description div, updating the elements to match the newly clicked element
function toggleGenus() {
	$(".genus-container").on("click", function() {
		var genus = $(this).attr('name');
		var genusString = '<h2><strong>Genus: </strong>' + genus + '</h2>';
		var removeSpan = function() {
			$("span").remove(".genus-container:first-of-type .genus");
		};
		if ($("#description").css("display") == 'none') {
			$("#description").show();
			$("#description").append('<hr width="50%"></hr>');
			$(this).clone().prependTo($("#description"));
			var genusBlock = $(".genus-container:first-of-type");
			genusBlock.children("img").css("display", "inline-block");
			removeSpan();
			$("#description").prepend(genusString);
		} else if ($(this) != genusBlock) {
			var genusBlock = $(".genus-container:first-of-type");
			var copy = $(this).clone();
			genusBlock.replaceWith(copy);
			copy.children("img").css("display", "inline-block");
			removeSpan();
			$("#description h2").replaceWith(genusString);
		}
	});
	// Upon clicking on the 'X', empties and hides the Description div
	$("#remove").on("click", function() {
		$("#description").contents().filter(function () {
    		return this.id != "remove";
		}).remove();
		$("#description").hide();
	})
}

// Creates Psuedo-JSON Object
// Most of the text file is excluded in order to optimize load times
function parseFileToJSON() {
	var textFile = ["img/+Laburnocytisus/IMG_4527.JPG",
	"img/+Laburnocytisus/IMG_4530.JPG",
	"img/+Laburnocytisus/IMG_4536.JPG",
	"img/+Laburnocytisus/IMG_4543.JPG",
	"img/+Laburnocytisus/IMG_4554.JPG",
	"img/Abelia/IMG_0006.JPG",
	"img/Abelia/IMG_6682.JPG",
	"img/Abelia/IMG_8041.JPG",
	"img/Abelia/IMG_8042.JPG",
	"img/Abelia/IMG_8565.JPG",
	"img/Abeliophyllum/IMG_8401.JPG",
	"img/Abeliophyllum/IMG_9908.JPG",
	"img/Abeliophyllum/IMG_9911.JPG",
	"img/Abelmoschus/IMG_2144.JPG",
	"img/Abelmoschus/IMG_2147.JPG",
	"img/Abelmoschus/IMG_7818.JPG",
	"img/Abelmoschus/IMG_7830.JPG",
	"img/Abelmoschus/IMG_7831.JPG",
	"img/Abroma/IMG_1404.JPG",
	"img/Abroma/IMG_5560.JPG",
	"img/Abroma/IMG_8486.JPG",
	"img/Abromeitiella/IMG_5568.JPG",
	"img/Abromeitiella/IMG_5578.JPG",
	"img/Abromeitiella/IMG_7713.JPG",
	"img/Abrus/IMG_2818.JPG",
	"img/Abrus/IMG_2832.JPG",
	"img/Abrus/IMG_2833.JPG",
	"img/Abuitilon/IMG_1988.JPG",
	"img/Abuitilon/IMG_1998.JPG",
	"img/Abuitilon/IMG_8078.jpg",
	"img/Abuitilon/IMG_8093.jpg",
	"img/Acacia/IMG_0808.JPG",
	"img/Acacia/IMG_1403.JPG",
	"img/Acacia/IMG_1548.JPG",
	"img/Acacia/IMG_4827_2.JPG",
	"img/Acacia/IMG_8574.JPG",
	"img/Acaena/IMG_0416.JPG",
	"img/Acaena/IMG_6918.JPG",
	"img/Acaena/IMG_6920.JPG",
	"img/Acalypha/IMG_1099.JPG",
	"img/Acalypha/IMG_6313.JPG",
	"img/Acalypha/IMG_7416.JPG",
	"img/Acanthocalycium/IMG_4587.JPG",
	"img/Acanthocalycium/IMG_4588.JPG",
	"img/Acanthocalycium/IMG_4589.JPG",
	"img/Acanthocereus/IMG_1299.JPG",
	"img/Acanthocereus/IMG_1308.JPG",
	"img/Acanthocereus/IMG_1313.JPG",
	"img/Acanthostachys/IMG_0832.JPG",
	"img/Acanthostachys/IMG_1418.JPG",
	"img/Acanthostachys/IMG_1754.JPG",
	"img/Acanthus/IMG_3148.jpg" /*,
	"img/Acanthus/IMG_3151.jpg",
	"img/Acanthus/IMG_6783.JPG",
	"img/Acca/IMG_1092_2.JPG",
	"img/Acca/IMG_5775.JPG",
	"img/Acca/IMG_7144_2.JPG",
	"img/Acca/IMG_7147_2.JPG",
	"img/Acca/IMG_7615.JPG",
	"img/Acer/IMG_1330.JPG",
	"img/Acer/IMG_1332.JPG",
	"img/Acer/IMG_1515.JPG",
	"img/Acer/IMG_1519.JPG",
	"img/Acer/IMG_3930.JPG",
	"img/Acer/IMG_3932.JPG",
	"img/Acer/IMG_4782.JPG",
	"img/Acer/IMG_8201.JPG",
	"img/Acer/IMG_9644.JPG",
	"img/Acer/IMG_9649.JPG",
	"img/Acer/IMG_9669.JPG",
	"img/Achillea/IMG_0480.JPG",
	"img/Achillea/IMG_2021.JPG",
	"img/Achillea/IMG_2026.JPG",
	"img/Achillea/IMG_3837.JPG",
	"img/Achlys/IMG_4584.JPG",
	"img/Achlys/IMG_4585.JPG",
	"img/Achnatherum/IMG_1491.JPG",
	"img/Achnatherum/IMG_1497.JPG",
	"img/Achyranthes/IMG_8671.JPG",
	"img/Achyranthes/IMG_8679.JPG",
	"img/Acinos/IMG_4526.JPG",
	"img/Acinos/IMG_9291.JPG",
	"img/Acinos/IMG_9292.JPG",
	"img/Aconitum/IMG_2320.jpg",
	"img/Aconitum/IMG_2327.jpg",
	"img/Aconitum/IMG_7452.jpg",
	"img/Aconitum/IMG_7454.jpg",
	"img/Aconitum/IMG_8662.JPG",
	"img/Aconitum/IMG_8665.JPG",
	"img/Acradenia/IMG_1523.JPG",
	"img/Acradenia/IMG_1528.JPG",
	"img/Actaea/IMG_0888.JPG",
	"img/Actaea/IMG_2304.JPG",
	"img/Actiniopteris/IMG_4756.JPG",
	"img/Actiniopteris/IMG_4763.JPG",
	"img/Actinodaphne/IMG_2968.JPG",
	"img/Actinodaphne/IMG_2970.JPG",
	"img/Actinodaphne/IMG_2982.JPG",
	"img/Adansonia/IMG_1538.JPG",
	"img/Adansonia/IMG_1543.JPG",
	"img/Adansonia/IMG_2111.JPG",
	"img/Adansonia/IMG_2112.JPG",
	"img/Adansonia/IMG_2113.JPG",
	"img/Adenium/IMG_7013.jpg",
	"img/Adenium/IMG_7031.jpg",
	"img/Adenium/IMG_7062.jpg",
	"img/Adenocarpus/IMG_7779.JPG",
	"img/Adenocarpus/IMG_7782.JPG",
	"img/Adenocarpus/IMG_7789.JPG",
	"img/Adiantum/IMG_0784.JPG",
	"img/Adiantum/IMG_2709.JPG",
	"img/Adiantum/IMG_3614.JPG",
	"img/Adromischus/IMG_1810.JPG",
	"img/Adromischus/IMG_1816.JPG",
	"img/Adromischus/IMG_3703.JPG",
	"img/Aechmea/IMG_2606.JPG",
	"img/Aechmea/IMG_3162.JPG",
	"img/Aechmea/IMG_4105.JPG",
	"img/Aechmea/IMG_5934.JPG",
	"img/Aechmea/IMG_5980.JPG",
	"img/Aechmea/IMG_7904.JPG",
	"img/Aechmea/IMG_8264.JPG",
	"img/Aechmea/IMG_8360.JPG",
	"img/Aechmea/IMG_9395.JPG",
	"img/Aegopodium/IMG_8915.JPG",
	"img/Aegopodium/IMG_8924.JPG",
	"img/Aesculus/IMG_6467.JPG",
	"img/Aesculus/IMG_6484.JPG",
	"img/Aesculus/IMG_8478.JPG",
	"img/Aesculus/IMG_8493.JPG",
	"img/Aethionema/IMG_2255.JPG",
	"img/Aethionema/IMG_7881.JPG",
	"img/Aframomum/IMG_5094.JPG",
	"img/Aframomum/IMG_5104.JPG",
	"img/Aframomum/IMG_5112.JPG",
	"img/Afrocarpus/IMG_2182.JPG",
	"img/Afrocarpus/IMG_2183.JPG",
	"img/Afrocarpus/IMG_4263.JPG",
	"img/Agapanthus/IMG_3795.JPG",
	"img/Agapanthus/IMG_4847.JPG",
	"img/Agaricus/IMG_0251.JPG",
	"img/Agaricus/IMG_0259.JPG",
	"img/Agaricus/IMG_0269.JPG",
	"img/Agarista/IMG_4100.JPG",
	"img/Agarista/IMG_4102.JPG",
	"img/Agathis/IMG_5387.JPG",
	"img/Agathis/IMG_5389.JPG",
	"img/Agathis/IMG_5397.JPG",
	"img/Agave/IMG_0496.JPG",
	"img/Agave/IMG_5630.JPG",
	"img/Agave/IMG_7708.JPG",
	"img/Agave/IMG_8002.JPG",
	"img/Aglaia/IMG_7576.JPG",
	"img/Aglaia/IMG_7579.JPG",
	"img/Aglaia/IMG_7720.JPG",
	"img/Aglaomorpha/IMG_7603.JPG",
	"img/Aglaomorpha/IMG_7604.JPG",
	"img/Aglaomorpha/IMG_7605.JPG",
	"img/Aglaonema/IMG_8470.JPG",
	"img/Aglaonema/IMG_8472.JPG",
	"img/Aglaonema/IMG_8486.JPG",
	"img/Agonis/IMG_7782.JPG",
	"img/Agonis/IMG_8157.JPG",
	"img/Agoseris/IMG_0938.JPG",
	"img/Agoseris/IMG_0942.JPG",
	"img/Agoseris/IMG_2500.JPG",
	"img/Agrimonia/IMG_4156.JPG",
	"img/Agrimonia/IMG_6698.JPG",
	"img/Akebia/IMG_2143.JPG",
	"img/Akebia/IMG_3096.JPG",
	"img/Akebia/IMG_9619.JPG",
	"img/Akebia/IMG_9879.JPG",
	"img/Akebia/IMG_9893.JPG",
	"img/Albuca/IMG_8289.jpg",
	"img/Albuca/IMG_8313.jpg",
	"img/Albuca/IMG_8321.jpg",
	"img/Alcantarea/IMG_5393.JPG",
	"img/Alcantarea/IMG_5397.JPG",
	"img/Alcantarea/IMG_5399.JPG",
	"img/Alcea/IMG_2810.JPG",
	"img/Alcea/IMG_2819.JPG",
	"img/Alchemilla/IMG_6365.JPG",
	"img/Alchemilla/IMG_6367.JPG",
	"img/Alchemilla/IMG_6369.JPG",
	"img/Alisma/IMG_0455.JPG",
	"img/Alisma/IMG_2578.JPG",
	"img/Alisma/IMG_6081.JPG",
	"img/Allamanda/IMG_6761.JPG",
	"img/Allamanda/IMG_6764.JPG",
	"img/Allamanda/IMG_6765.JPG",
	"img/Alliaria/IMG_4675.jpg",
	"img/Alliaria/IMG_4677.jpg",
	"img/Alliaria/IMG_4684.jpg",
	"img/Alluaudia/IMG_3571.JPG",
	"img/Alluaudia/IMG_4818.JPG",
	"img/Alluaudia/IMG_4820.JPG",
	"img/Alniphyllum/IMG_1073.JPG",
	"img/Alniphyllum/IMG_1076.JPG",
	"img/Alniphyllum/IMG_1084.JPG",
	"img/Alnus/IMG_5141.JPG",
	"img/Alnus/IMG_5153.JPG",
	"img/Alocasia/IMG_1296.JPG",
	"img/Alocasia/IMG_1297.JPG",
	"img/Alocasia/IMG_1304.JPG",
	"img/Alocasia/IMG_4029.JPG",
	"img/Aloysia/IMG_6791.JPG",
	"img/Aloysia/IMG_6792.JPG",
	"img/Aloysia/IMG_6911.jpg",
	"img/Alstroemeria/IMG_1580.JPG",
	"img/Alstroemeria/IMG_2627.JPG",
	"img/Alternanthera/IMG_4552.jpg",
	"img/Alternanthera/IMG_4559.jpg",
	"img/Alternanthera/IMG_4565.jpg",
	"img/Althaea/IMG_0713.JPG",
	"img/Althaea/IMG_0721.JPG",
	"img/Althaea/IMG_4717.JPG",
	"img/Alyssum/IMG_5030.JPG",
	"img/Alyssum/IMG_5034.JPG",
	"img/Alyssum/IMG_5041.JPG",
	"img/Amanita/IMG_7020.JPG",
	"img/Amanita/IMG_7029.JPG",
	"img/Amanita/IMG_8117.JPG",
	"img/Amaranthus/IMG_8260.JPG",
	"img/Amaranthus/IMG_8264.JPG",
	"img/Amaranthus/IMG_8266.JPG",
	"img/Amaryllis/IMG_0341.JPG",
	"img/Amaryllis/IMG_0343.JPG",
	"img/Amaryllis/IMG_0545.JPG",
	"img/Amberboa/denverbg 213.JPG",
	"img/Amberboa/denverbg 216.JPG",
	"img/Amborella/IMG_7621.JPG",
	"img/Amborella/IMG_7623.JPG",
	"img/Amborella/IMG_7630.JPG",
	"img/Ambrosia/IMG_1768.JPG",
	"img/Ambrosia/IMG_1773.JPG",
	"img/Ambrosia/IMG_1781.JPG",
	"img/Amelanchier/IMG_1895.jpg",
	"img/Amelanchier/IMG_1899.jpg",
	"img/Amelanchier/IMG_3445.JPG",
	"img/Amelanchier/IMG_3447.JPG",
	"img/Amelanchier/IMG_3448.JPG",
	"img/Amorpha/IMG_2058.JPG",
	"img/Amorpha/IMG_2065.JPG",
	"img/Amorpha/IMG_2066.JPG",
	"img/Amorphophallus/IMG_1096.JPG",
	"img/Amorphophallus/IMG_1182.JPG",
	"img/Amorphophallus/IMG_3664.JPG",
	"img/Amorphophallus/IMG_9369.JPG",
	"img/Amorphophallus/IMG_9387.JPG",
	"img/Amorphophallus/IMG_9389.JPG",
	"img/Ampelopsis/IMG_9660.JPG",
	"img/Ampelopsis/IMG_9666.JPG",
	"img/Anacampseros/IMG_7511.JPG",
	"img/Anacampseros/IMG_7512.JPG",
	"img/Anacampseros/IMG_7546.JPG",
	"img/Anacyclus/IMG_3792.jpg",
	"img/Anacyclus/IMG_3801.jpg",
	"img/Anacyclus/IMG_3823.jpg",
	"img/Anagallis/IMG_4366.JPG",
	"img/Anagallis/IMG_4368.JPG",
	"img/Anagallis/IMG_4370.JPG",
	"img/Anchomanes/IMG_0176.JPG",
	"img/Anchomanes/IMG_4778.JPG",
	"img/Anchomanes/IMG_6115.JPG",
	"img/Anchomanes/IMG_6116.JPG",
	"img/Anchomanes/IMG_9825.JPG",
	"img/Anchusa/IMG_2499.JPG",
	"img/Anchusa/IMG_2502.JPG",
	"img/Andrographis/IMG_1853.JPG",
	"img/Andrographis/IMG_1863.JPG",
	"img/Andrographis/IMG_2625.JPG",
	"img/Anemanthele/IMG_7456.JPG",
	"img/Anemanthele/IMG_8989.JPG",
	"img/Anemanthele/IMG_8994.JPG",
	"img/Anemarrhena/IMG_4766.JPG",
	"img/Anemarrhena/IMG_6147.JPG",
	"img/Anemarrhena/IMG_6150.JPG",
	"img/Anemia/IMG_4729.JPG",
	"img/Anemia/IMG_4733.JPG",
	"img/Anemia/IMG_4735.JPG",
	"img/Anemone/IMG_1113.JPG",
	"img/Anemone/IMG_4095.JPG",
	"img/Anemone/IMG_4214.JPG",
	"img/Anemone/IMG_6112.JPG",
	"img/Anemone/IMG_7198.JPG",
	"img/Anemone/IMG_7257.JPG",
	"img/Anemone/IMG_7258.JPG",
	"img/Anemone/IMG_9405.JPG",
	"img/Anemopsis/IMG_1454.JPG",
	"img/Anemopsis/IMG_1458.JPG",
	"img/Anemopsis/IMG_3922.JPG",
	"img/Anethum/IMG_5853.JPG",
	"img/Anethum/IMG_5860.JPG",
	"img/Angelica/IMG_2944.jpg",
	"img/Angelica/IMG_2950.jpg",
	"img/Angelica/IMG_4061.JPG",
	"img/Angelica/IMG_6684.JPG",
	"img/Angelica/IMG_6685.JPG",
	"img/Angelonia/IMG_3851.jpg",
	"img/Angelonia/IMG_3877.jpg",
	"img/Angelonia/IMG_7963.JPG",
	"img/Angiopteris/IMG_2146.JPG",
	"img/Angiopteris/IMG_2160.JPG",
	"img/Angiopteris/IMG_2161.JPG",
	"img/Angiopteris/IMG_2173.JPG",
	"img/Angiopteris/IMG_2174.JPG",
	"img/Anigozanthos/IMG_8049.JPG",
	"img/Anigozanthos/IMG_8282.JPG",
	"img/Anigozanthos/IMG_9960.JPG",
	"img/Anisacanthus/IMG_1228.JPG",
	"img/Anisacanthus/IMG_1232.JPG",
	"img/Anisotome/IMG_6942.JPG",
	"img/Anisotome/IMG_6949.JPG",
	"img/Anisotome/IMG_6952.JPG",
	"img/Annona/IMG_0686_2.JPG",
	"img/Annona/IMG_1583_2.JPG",
	"img/Annona/IMG_8724.JPG",
	"img/Anredera/IMG_8152.JPG",
	"img/Anredera/IMG_8154.JPG",
	"img/Anredera/IMG_8163.JPG",
	"img/Anthemis/denverbg 228.JPG",
	"img/Anthemis/denverbg 235.JPG",
	"img/Anthriscus/IMG_0468.JPG",
	"img/Anthriscus/IMG_3480.jpg",
	"img/Anthriscus/IMG_3483.jpg",
	"img/Anthriscus/IMG_3487.jpg",
	"img/Anthriscus/IMG_3491.jpg",
	"img/Antirrhinum/IMG_2287.JPG",
	"img/Antirrhinum/IMG_8827.JPG",
	"img/Antirrhinum/IMG_8836.JPG",
	"img/Antirrhinum/IMG_8841.JPG",
	"img/Antirrhinum/IMG_8854.JPG",
	"img/Antirrhinum/IMG_8856.JPG",
	"img/Anubias/IMG_8843.JPG",
	"img/Anubias/IMG_8847.JPG",
	"img/Aphelandra/IMG_2184.JPG",
	"img/Aphelandra/IMG_2184b.JPG",
	"img/Aphelandra/IMG_2270.JPG",
	"img/Aphelandra/IMG_8474_2.JPG",
	"img/Apollonias/IMG_1715.JPG",
	"img/Apollonias/IMG_1716.JPG",
	"img/Aptenia/IMG_6475.JPG",
	"img/Aptenia/IMG_6481.JPG",
	"img/Aptenia/IMG_7392.JPG",
	"img/Arabis/IMG_5729.JPG",
	"img/Arabis/IMG_5779.JPG",
	"img/Arabis/IMG_5831.JPG",
	"img/Arachnoides/IMG_3970.JPG",
	"img/Arachnoides/IMG_3974.JPG",
	"img/Arachnoides/IMG_9894.JPG",
	"img/Aralia/IMG_0386.JPG",
	"img/Aralia/IMG_0459.JPG",
	"img/Aralia/IMG_0464.JPG",
	"img/Araucaria/IMG_5493.JPG",
	"img/Araucaria/IMG_7069.JPG",
	"img/Araucaria/IMG_9979.JPG",
	"img/Archontophoenix/009.JPG",
	"img/Archontophoenix/IMG_5379.JPG",
	"img/Archontophoenix/IMG_5447.JPG",
	"img/Archontophoenix/IMG_5448.JPG",
	"img/Archontophoenix/IMG_7556.JPG",
	"img/Arctostaphylos/IMG_4281.JPG",
	"img/Arctostaphylos/IMG_4292.JPG",
	"img/Arctostaphylos/IMG_4303.JPG",
	"img/Areca/IMG_0847.JPG",
	"img/Areca/IMG_0848.JPG",
	"img/Areca/IMG_0850_2.JPG",
	"img/Argemone/IMG_1905.JPG",
	"img/Argemone/IMG_1909.JPG",
	"img/Argemone/IMG_1912.JPG",
	"img/Argemone/IMG_1913.JPG",
	"img/Argemone/IMG_5286.JPG",
	"img/Argyrocytisus/IMG_0714.JPG",
	"img/Argyrocytisus/IMG_0718.JPG",
	"img/Argyrocytisus/IMG_0724.JPG",
	"img/Argyrocytisus/IMG_9254.JPG",
	"img/Argyrocytisus/IMG_9261.JPG",
	"img/Argyroderma/IMG_1259.JPG",
	"img/Argyroderma/IMG_1267.JPG",
	"img/Argyroderma/IMG_1278.JPG",
	"img/Argyroderma/IMG_3762.jpg",
	"img/Argyroderma/IMG_3772.jpg",
	"img/Ariocarpus/IMG_5809.JPG",
	"img/Ariocarpus/IMG_8113.JPG",
	"img/Ariocarpus/IMG_8115.JPG",
	"img/Aristida/denverbg 058.JPG",
	"img/Aristida/denverbg 059.JPG",
	"img/Aristida/denverbg 067.JPG",
	"img/Aristotelia/IMG_4605.JPG",
	"img/Aristotelia/IMG_9929.JPG",
	"img/Aristotelia/IMG_9930.JPG",
	"img/Armatocereus/IMG_0498.JPG",
	"img/Armatocereus/IMG_0505.JPG",
	"img/Armatocereus/IMG_0511.JPG",
	"img/Armeria/IMG_4264.jpg",
	"img/Armeria/IMG_4275.jpg",
	"img/Armeria/IMG_4279.jpg",
	"img/Armoracia/IMG_4370.JPG",
	"img/Armoracia/IMG_4374.JPG",
	"img/Armoracia/IMG_4382.JPG",
	"img/Arnica/IMG_8205.JPG",
	"img/Arnica/IMG_8207.JPG",
	"img/Arnica/IMG_8209.JPG",
	"img/Arrhenatherum/IMG_3579.jpg",
	"img/Arrhenatherum/IMG_3584.jpg",
	"img/Arthropodium/IMG_2698.jpg",
	"img/Arthropodium/IMG_2700.jpg",
	"img/Arum/IMG_9028.JPG",
	"img/Arum/IMG_9973.JPG",
	"img/Arum/IMG_9976.JPG",
	"img/Aruncus/IMG_6568.JPG",
	"img/Aruncus/IMG_6574.JPG",
	"img/Aruncus/IMG_6580.JPG",
	"img/Arundo/IMG_5652.JPG",
	"img/Arundo/IMG_7937.JPG",
	"img/Arundo/IMG_7939.JPG",
	"img/Asimina/IMG_3843.JPG",
	"img/Asimina/IMG_3850.JPG",
	"img/Asimina/IMG_6702.JPG",
	"img/Asimina/IMG_6704.JPG",
	"img/Asimina/IMG_6710.JPG",
	"img/Asperula/IMG_0488.JPG",
	"img/Asperula/IMG_0494.JPG",
	"img/Asperula/IMG_0495.JPG",
	"img/Asphodeline/IMG_3372.JPG",
	"img/Asphodeline/IMG_3378.JPG",
	"img/Asphodeline/IMG_3571.JPG",
	"img/Aspidistra/IMG_1943.JPG",
	"img/Aspidistra/IMG_1970.JPG",
	"img/Aspidistra/IMG_4964.JPG",
	"img/Aster/IMG_3639.JPG",
	"img/Aster/IMG_4299.JPG",
	"img/Aster/IMG_6204.JPG",
	"img/Aster/IMG_8111.JPG",
	"img/Aster/IMG_8118.JPG",
	"img/Asterogyne/IMG_5138.JPG",
	"img/Asterogyne/IMG_5140.JPG",
	"img/Asterogyne/IMG_5146.JPG",
	"img/Astilbe/IMG_0272.JPG",
	"img/Astilbe/IMG_0452.JPG",
	"img/Astilbe/IMG_0684.JPG",
	"img/Astragalus/IMG_4387.JPG",
	"img/Astragalus/IMG_4389.JPG",
	"img/Astrantia/IMG_0274.JPG",
	"img/Astrantia/IMG_0275.JPG",
	"img/Astrantia/IMG_6547.JPG",
	"img/Astrantia/IMG_7577.JPG",
	"img/Astrolepis/IMG_6721.JPG",
	"img/Astrolepis/IMG_6729.JPG",
	"img/Astrolepis/IMG_6730.JPG",
	"img/Astroloba/IMG_1435.JPG",
	"img/Astroloba/IMG_2231.JPG",
	"img/Astroloba/IMG_2232.JPG",
	"img/Astrophytum/IMG_4098_3.JPG",
	"img/Astrophytum/IMG_6312.JPG",
	"img/Astrophytum/IMG_6392.JPG",
	"img/Astrophytum/IMG_7235.JPG",
	"img/Astrophytum/IMG_8632.JPG",
	"img/Athrotaxis/IMG_0961.JPG",
	"img/Athrotaxis/IMG_0968.JPG",
	"img/Athrotaxis/IMG_0970.JPG",
	"img/Atriplex/IMG_0867.JPG",
	"img/Atriplex/IMG_0869.JPG",
	"img/Atriplex/IMG_3867.JPG",
	"img/Atropa/IMG_1368.JPG",
	"img/Atropa/IMG_3738.JPG",
	"img/Atropa/IMG_3741.JPG",
	"img/Atropa/IMG_6935.JPG",
	"img/Atropa/IMG_6944.JPG",
	"img/Aubrieta/IMG_7741.JPG",
	"img/Aubrieta/IMG_7989.JPG",
	"img/Aulax/IMG_8302.JPG",
	"img/Aulax/IMG_8470.JPG",
	"img/Auricularia/IMG_0187.JPG",
	"img/Auricularia/IMG_0191.JPG",
	"img/Auricularia/IMG_0199.JPG",
	"img/Aurinia/IMG_3519.JPG",
	"img/Aurinia/IMG_4911.JPG",
	"img/Aurinia/IMG_4938.JPG",
	"img/Austrobaileya/IMG_5442.JPG",
	"img/Austrobaileya/IMG_7440.JPG",
	"img/Austrobaileya/IMG_9165.JPG",
	"img/Austrocedrus/IMG_6663.JPG",
	"img/Austrocedrus/IMG_6669.JPG",
	"img/Austrocedrus/IMG_7107.JPG",
	"img/Austrocylindropuntia/IMG_1634.JPG",
	"img/Austrocylindropuntia/IMG_4563.JPG",
	"img/Austrocylindropuntia/IMG_4809.JPG",
	"img/Averrhoa/IMG_0932_2.JPG",
	"img/Averrhoa/IMG_0935_2.JPG",
	"img/Averrhoa/IMG_7810.JPG",
	"img/Azolla/IMG_2447.JPG",
	"img/Azolla/IMG_3196.JPG",
	"img/Azolla/IMG_8593.JPG",
	"img/Azorella/IMG_3418.JPG",
	"img/Azorella/IMG_3420.JPG" */];
	for (var i = 0; i < textFile.length; i++) {
		var line = textFile[i];
		var tokens = line.split("/");
		var genus = tokens[1];
		var imageURL = tokens[2];
		var image = new Image();
		image.src = line;
		images.push(image);
		if (!photoArray[genus]) {
			photoArray[genus] = [];
		}
		photoArray[genus].push(imageURL);
	}
}

}) ();