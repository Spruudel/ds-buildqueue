// ==UserScript==
// @name         Bauschleife
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://*.die-staemme.de/game.php*screen=main
// @grant        none
// ==/UserScript==

(function() {
    //kek
    function createBtn() {
        var script = 'var queue = []; \n function can_build(id) \n { \n var wood = parseInt($(\'#wood\').text()); \n var stone = parseInt($(\'#wood\').text()); \n var iron = parseInt($(\'#iron\').text()); \n var wood_cost = BuildingMain.buildings[id].wood;\n var stone_cost = BuildingMain.buildings[id].stone;\n var iron_cost = BuildingMain.buildings[id].iron;\n var wood_check = wood >= wood_cost;\n var stone_check = stone >= stone_cost;\n var iron_check = iron >= iron_cost;\n var space_free = BuildingMain.order_count < 2;\n return (wood_check && stone_check & iron_check && space_free);\n }\n function delQueue(id) {\n queue.splice(id, 1);\n update();\n }\n function try_build(id)\n {\n if(can_build(id))\n {\n BuildingMain.build(id);\n return true;\n }\n else\n {\n return false;\n }\n }\n function build(id)\n {\n queue.push(id);\n update();\n }\n setInterval(function()\n {\n if(queue.length != 0)\n {\n if(try_build(queue[0]))\n {\n queue.shift();\n }\n }\n update();\n }, 1000);\n function init() \n {\n $(\'#building_wrapper\').prepend(\'<div id="bot_queue"></div>\');\n update();\n }\n function update()\n {\n var buildings = Object.getOwnPropertyNames(BuildingMain.buildings);\n var html = \'\';\n html += \'<table style="width: 100%" class="vis nowrap">\';\n html += \'<th width="20%">Gebäude</th>\';\n html += \'<th width="10%">Bauen</th>\';\n html += \'<th colspan="10" width="70%">Warteschlange</th>\';\n for(var i=0; i<buildings.length; i++)\n {\n html += \'<tr>\';\n html += \'<td><img src="https://dsde.innogamescdn.com/8.34.5/26689/graphic/buildings/mid/\' + buildings[i] + \'1.png">\';\n html +=\'<a href="#">\' + BuildingMain.buildings[buildings[i]].name + \'</a></td>\';\n html += \'<td><button class="btn" onclick="build(\' + "\'" + buildings[i] + "\'" + \')">Bauen</button></td>\';\n for(var j=0; j<10; j++)\n {\n if(buildings[i] == queue[j])\n {\n html += \'<td onclick="delQueue(\'+ j +\')"style="background-color: green"></td>\';\n }\n else\n {\n html += \'<td></td>\';\n }\n }\n html += \'</tr>\';\n }\n html += \'</table><br>\';\n if($(\'#bot_queue\').length == 0)\n {\n init();\n }\n $(\'#bot_queue\').html(html);\n }\n init();';

        $('#contentContainer').prepend('<div id="initBtn"><textarea id="textScript" rows="4" cols="50" ></textarea></div>');
        $("#textScript").val(script);

    }
    
    createBtn();

})();
