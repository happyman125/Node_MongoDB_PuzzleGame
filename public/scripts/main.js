/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here
 
})();

function solve() {
    const array = ['fire_count', 'water_count', 'wood_count', 'light_count', 'dark_count', 'health_count', 'poison_count', 'sPoison_count', 'jiama_count', 'bomb_count'];
    var count = [];
    array.forEach(item => count.push(parseInt(document.getElementById(item).value)));
    var colors = 0;
    var total = 0;
    for(var i = 0; i < array.length; i++){
        total += count[i];
        if (count[i] != 0) colors += 1;
    }
    if(total > 0 && total != 30){
        if($.session.get('language') == 'ch')
            alert('非法盤面，請重新輸入');
        else if($.session.get('language') == 'en')
            alert('Invalid board. Please check your input.');
        else if($.session.get('language') == 'jp')
            alert('無効な盤面です。 入力内容を確認してください。');
    }
    if(colors == 2)
        solve2(count);
    else if(colors==3)
        solve3(count);
    else if(colors > 3)
        solveMultiple(count);
    if(colors > 0)
        drawNext();
}

function solve2(count){
    // find the 2 color and their count
    var count2 = Math.max(...count);
    // count1 is (the sum of count) - count2
    var count1 = count.reduce((a,b) => a + b, 0) - count2;
    var color1 = count.indexOf(count1), color2 = count.lastIndexOf(count2);
    
    // 0 for the less color, 1 for the more
    var ans = new Array();
    ans[0] = new Array();
    ans[1] = new Array();
    ans[2] = new Array();
    ans[3] = new Array();
    ans[4] = new Array();
    ans[5] = new Array();
    ans[6] = new Array();
    ans[7] = new Array();
    ans[8] = new Array([1,1,0,1,1,1,1,1,0,1,1,0,1,0,1,0,0,1,0,1,1,1,1,1,1,1,0,1,1,1]);
    ans[9] = new Array([1,1,1,0,1,1,0,0,0,1,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,1,1,0,1,1]);
    ans[10] = new Array([1,1,1,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1]);
    ans[11] = new Array([1,1,1,0,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1]);
    ans[12] = new Array([0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1]);
    ans[13] = new Array([0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1]);
    ans[14] = new Array([0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1]);
    ans[15] = new Array([0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1]);
    
    // adding 3*3 solutions
    ans[11].unshift([1,1,1,0,1,0,0,0,0,1,1,0,1,1,1,0,1,0,1,1,1,0,0,1,1,1,1,0,1,1]);
    ans[12].unshift([1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0]);
    ans[13].unshift([1,1,1,0,0,0,0,0,0,1,0,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0]);
    ans[14].unshift([0,1,1,0,0,0,0,0,0,1,0,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0]);

    // adding heart attack XD
    ans[12].unshift([1,0,1,1,1,1,1,0,1,0,0,0,1,0,0,1,1,1,1,0,1,0,0,0,1,0,1,1,1,1]);
    ans[13].unshift([1,0,0,1,1,1,1,0,1,0,0,0,1,0,1,1,1,1,1,0,1,0,0,0,1,0,0,1,1,1]);
    ans[14].unshift([1,0,1,0,0,1,1,0,0,1,1,1,1,0,1,0,0,0,1,0,1,1,1,1,1,0,1,0,0,0]);
    ans[15].unshift([0,1,0,1,1,1,0,1,0,0,0,0,0,1,0,1,1,1,0,1,1,0,0,0,0,1,0,1,1,1]);
    ans[11].unshift([1,0,1,1,1,1,1,0,1,0,0,0,1,0,1,1,0,0,1,1,0,0,1,1,1,0,1,1,1,1]);
    ans[10].unshift([1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,0,0,1,0,1,0,1,1,1,1]);
    ans[9].unshift([1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,1,0,0,1,1,0,0,1,1,1,0,1,1,1,1]);
    
    // no solution for bombs
    if(ans[count1].length == 0 || color1 == 9 || color2 == 9){
        if($.session.get('language') == 'ch')
            alert('無解QAQ');
        else if($.session.get('language') == 'en')
            alert('No solution LUL');
        else if($.session.get('language') == 'jp')
            alert('ドロップの配置はありません');
    }
    else{
        // restore the ans to the input color
        function restoreColor(num){
            return num == 0 ? color1 : color2; 
        }
        for(var i=0; i<ans[count1].length; i++){
            console.log(i);
            console.log(ans[count1][i]);
            answers.push(ans[count1][i].map(restoreColor));
        }
    }
}

// global permutes for the combos' colors
var permutes = new Array();
// global answers saving final solutions
var answers = new Array();

function solve3(count){
    // pick the colors from buttom to top
    permutes = new Array();
    pickColor(count, [3,3,3,3,6,3,3], [[0,1], [0,2], [1,3], [2,3], [2,4], [3,4],[4,5],[5,6]]);
    for(var i=0; i<permutes.length; i++){
        var c0=permutes[i][0], c1 = permutes[i][1],c2 = permutes[i][2],c3 = permutes[i][3],c4 = permutes[i][4],c5 = permutes[i][5],c6 = permutes[i][6], c7 = permutes[i][7], c8=permutes[i][8], c9=permutes[i][9], c10=permutes[i][10], c11=permutes[i][11],c12=permutes[i][12];
        var remain = [c7,c8,c9,c10,c11,c12];
        // if the remain color == (c5 or c6), it does not count as remain 
        var isRemain=[], notRemain=[];
        for(var j=0; j<6; j++){
            if(remain[j] == c5 || remain[j] == c6)
                notRemain.push(remain[j]);
            else
                isRemain.push(remain[j]);
        }
        // if we have too many remain drops with wrong colors, skip this solution
        if(isRemain.length > 3)
            continue;
        if(!checkBomb(permutes[i], 13))
            continue;
        // else we're good, add this solution
        curAns = [c6,c6,c6,-1,-1,-1,c5,c5,c5,-1,-1,-1,c4,c4,c4,c4,c4,c4,c2,c2,c2,c3,c3,c3,c0,c0,c0,c1,c1,c1];
        var row1=3, row2=9;
        // put notRemain first so it will combine with c5 and c6
        for(var j=0; j<notRemain.length; j++){
            // if the belongin row is already full, put this drop into isRemain
            if((notRemain[j] == c6 && row1 > 5) || (notRemain[j] == c5 && row2 > 11))
                isRemain.push(notRemain[j]);
            else if(notRemain[j] == c6)
                curAns[row1++] = c6;
            else
                curAns[row2++] = c5;
        }
        var row1Remain=0, row2Remain=0;
        for(var j=0; j<isRemain.length; j++){
            if(row1 <= 5){
                curAns[row1++] = isRemain[j];
                row1Remain ++;
            }
            else{
                curAns[row2++] = isRemain[j];
                row2Remain ++;
            }
        }
        // check first row combo and third row combo not connected
        var valid= true;
        // if row1 remain or row2 remain forms a combo, it's invalid
        if(row1Remain >= 3 && curAns[5] == curAns[4] && curAns[4] == curAns[3])
            valid = false;
        if(row2Remain >= 3 && curAns[11] == curAns[10] && curAns[10] == curAns[9] && curAns[11]!=curAns[17])
            valid = false;  

        for(var j=0; j<3; j++){
            if(curAns[0] == curAns[3+j] && curAns[0] == curAns[9+j] && curAns[0] == curAns[15+j])
                valid = false;
        }
        
        if(valid)
            answers.push(curAns);
    }
    // if no answer, try solving this board using general solution
    if(answers.length == 0)
        solveMultiple(count);
    
    // deal with very bad corner cases
    if(answers.length == 0){
        // assign the count and colors
        var count0 = Math.max(...count);
        var count1 = -1, count2 = -1;
        var c0 = -1, c1 = -1, c2 = -1;
        for(var i = 0; i < count.length; i++){
            if(count[i] == count0)
                c0 = i;
            else if(count[i] != 0)
                count1 == -1 ? count1 = count[i] : count2 = count[i];
        }
        // make sure count1 is less than count2
        if(count1 > count2)
            [count1, count2] = [count2, count1];
        c1 = count.indexOf(count1), c2 = count.indexOf(count2);
        // 19, 6, 5 / 20, 5, 5 / 20, 7, 3 / 21, 6, 3 / 22, 5, 3
        if(count0 == 19 && count1 == 5)
            answers.push([c0,c0,c1,c0,c0,c0,c0,c0,c1,c0,c0,c0,c0,c0,c0,c1,c1,c1,c2,c2,c2,c0,c0,c0,c0,c0,c0,c2,c2,c2]);
        else if(count0 == 20 && count1 == 5)
            answers.push([c0,c0,c0,c0,c0,c0,c0,c0,c0,c2,c2,c2,c2,c2,c2,c0,c0,c0,c0,c0,c0,c1,c1,c1,c0,c0,c1,c0,c0,c0]);
        else if(count0 == 20 && count1 == 3)
            answers.push([c0,c0,c0,c2,c0,c0,c2,c2,c2,c0,c0,c0,c0,c0,c0,c2,c2,c2,c1,c1,c1,c0,c0,c0,c0,c0,c0,c0,c0,c0]);
        else if(count0 == 21 && count1 == 3)
            answers.push([c0,c0,c0,c1,c0,c0,c2,c2,c2,c0,c0,c0,c0,c0,c0,c1,c0,c0,c2,c2,c2,c0,c0,c0,c0,c0,c0,c1,c0,c0])
        else if(count0 == 22 && count1 == 3)
            answers.push([c0,c0,c2,c0,c0,c0,c0,c0,c2,c0,c0,c1,c0,c2,c0,c1,c1,c0,c2,c0,c0,c0,c0,c0,c0,c0,c2,c0,c0,c0])
    }

}

function solveMultiple(count){
    var maxCombo = 0;
    for(var i = 0; i < count.length; i++)
        maxCombo += Math.floor(count[i]/3);
    
    if(maxCombo < 7){
        if($.session.get('language') == 'ch')
            alert('無解QAQ');
        else if($.session.get('language') == 'en')
            alert('No solution LUL');
        else if($.session.get('language') == 'jp')
            alert('ドロップの配置はありません');
    }
    else if(maxCombo == 7){
        // 7 combo : 5, 5, 5, 3, 3, 3, 3
        permutes = new Array();
        pickColor(count, [5,5,5,3,3,3,3], [[0,1], [1,2], [2,3], [2,4], [2,5],[2,6], [3,4], [4,5], [5,6]]);
        for(var i=0; i<permutes.length; i++){
            var c0=permutes[i][0], c1 = permutes[i][1],c2 = permutes[i][2],c3 = permutes[i][3],c4 = permutes[i][4],c5 = permutes[i][5],c6 = permutes[i][6], c7 = permutes[i][7], c8=permutes[i][8], c9=permutes[i][9];
            if(!checkBomb(permutes[i], 7))
                continue;
            if(i==0 || (i>0 && !skipPermute(i, [0,1])))
                answers.push([c0,c1,c2,c3,c3,c3,c0,c1,c2,c4,c4,c4,c0,c1,c2,c5,c5,c5,c0,c1,c2,c6,c6,c6,c0,c1,c2,c7,c8,c9]);
        }

        // 7 combo : 5, 5, 5, 3, 3, 3, 3, change remain position
        permutes = new Array();
        pickColor(count, [5,5,5,3,3,3,3], [[0,1], [1,2], [2,3], [2,4], [2,5],[2,6], [3,4], [4,5]]);
        for(var i=0; i<permutes.length; i++){
            var c0=permutes[i][0], c1 = permutes[i][1],c2 = permutes[i][2],c3 = permutes[i][3],c4 = permutes[i][4],c5 = permutes[i][5],c6 = permutes[i][6], c7 = permutes[i][7], c8=permutes[i][8], c9=permutes[i][9];
            if(!checkBomb(permutes[i], 7))
                continue;
                        // check if remain connects combos
                        if((c5 == c6) && (c7 == c5 || c8 == c5 || c9 == c5))
                        continue;
            if(i==0 || (i>0 && !skipPermute(i, [0])))
                answers.push([c0,c1,c2,c3,c3,c3,c0,c1,c2,c4,c4,c4,c0,c1,c2,c5,c5,c5,c0,c1,c2,c7,c8,c9,c0,c1,c2,c6,c6,c6]);
        }
        
        permutes = new Array();
        
        // 7 combo : 5,5,4,4,3,3,3
        pickColor(count, [5,5,4,4,3,3,3], [[0,1], [1,2],[1,3], [2,3], [3,4], [3,5],[3,6], [4,5], [5,6]]);
        for(var i=0; i<permutes.length; i++){
            var c0=permutes[i][0], c1 = permutes[i][1],c2 = permutes[i][2],c3 = permutes[i][3],c4 = permutes[i][4],c5 = permutes[i][5],c6 = permutes[i][6], c7 = permutes[i][7], c8=permutes[i][8], c9=permutes[i][9];
            if(!checkBomb(permutes[i], 7))
                continue;
            if(i==0 || (i>0 && !skipPermute(i, [0,1])))
                answers.push([c0,c1,c4,c5,c6,c7,c0,c1,c4,c5,c6,c8,c0,c1,c4,c5,c6,c9,c0,c1,c3,c3,c3,c3,c0,c1,c2,c2,c2,c2]);
        }
        
    }
    else if(maxCombo == 8){
        
        // 8 combo : 6,4,4,4,3,3,3
        permutes = new Array();
        pickColor(count, [6,4,4,4,3,3,3], [[0,1], [0,2], [0,3], [1,2], [2,3], [3,4], [3,5], [3,6], [4,5], [5,6], [0,6]]);
        for(var i=0; i<permutes.length; i++){
            var c0=permutes[i][0], c1 = permutes[i][1],c2 = permutes[i][2],c3 = permutes[i][3],c4 = permutes[i][4],c5 = permutes[i][5],c6 = permutes[i][6], c7 = permutes[i][7], c8=permutes[i][8], c9=permutes[i][9];
            if(!checkBomb(permutes[i], 7))
                continue;
            // ignore boring permutations
            if(i==0 || (i>0 && !skipPermute(i, [0,1])))
                answers.push([c1,c2,c3,c4,c4,c4,c1,c2,c3,c5,c5,c5,c1,c2,c3,c6,c6,c6,c1,c2,c3,c7,c8,c9,c0,c0,c0,c0,c0,c0]);
        }

        // horizontal 4 drops 
        // case: 14, 6, 4, 4, 0, 2
        permutes = new Array();
        pickColor(count, [6,3,3,4,4,4,3], [[0,1], [0,2], [1,2], [2,3], [1,3], [3,4], [4,5], [3,6], [4,5], [5,6], [0,6], [2,6]]);
        for(var i=0; i<permutes.length; i++){
            var c0=permutes[i][0], c1 = permutes[i][1],c2 = permutes[i][2],c3 = permutes[i][3],c4 = permutes[i][4],c5 = permutes[i][5],c6 = permutes[i][6], c7 = permutes[i][7], c8=permutes[i][8], c9=permutes[i][9];
            if(!checkBomb(permutes[i], 7))
                continue;
            // ignore boring permutations
            if(i==0 || (i>0 && !skipPermute(i, [0,1])))
                answers.push([c5,c5,c5,c5,c7,c6,c4,c4,c4,c4,c8,c6,c3,c3,c3,c3,c9,c6,c1,c1,c1,c2,c2,c2,c0,c0,c0,c0,c0,c0]);
        }
        
        // 8 combo : 6,5,4,3,3,3,3
        permutes = new Array();
        pickColor(count, [6,5,4,3,3,3,3], [[0,1], [0,2], [1,2], [1,3], [1,4], [1,5], [1,6], [2,3], [3,4], [4,5], [5,6]]);
        for(var i=0; i<permutes.length; i++){
            var c0=permutes[i][0], c1 = permutes[i][1],c2 = permutes[i][2],c3 = permutes[i][3],c4 = permutes[i][4],c5 = permutes[i][5],c6 = permutes[i][6], c7 = permutes[i][7], c8=permutes[i][8], c9=permutes[i][9];
            // ignore boring permutations
            if(!checkBomb(permutes[i], 7))
                continue;
            if(i==0 || (i>0 && !skipPermute(i, [0,1])))
                answers.push([c2,c3,c4,c5,c6,c7,c2,c3,c4,c5,c6,c8,c2,c3,c4,c5,c6,c9,c2,c1,c1,c1,c1,c1,c0,c0,c0,c0,c0,c0]);
        }

        // 8 combo : 6,5,4,3,3,3,3, change remain position
        permutes = new Array();
        pickColor(count, [6,5,4,3,3,3,3], [[0,1], [0,2], [1,2], [1,3], [1,4], [1,5], [1,6], [2,3], [3,4], [4,5]]);
        for(var i=0; i<permutes.length; i++){
            var c0=permutes[i][0], c1 = permutes[i][1],c2 = permutes[i][2],c3 = permutes[i][3],c4 = permutes[i][4],c5 = permutes[i][5],c6 = permutes[i][6], c7 = permutes[i][7], c8=permutes[i][8], c9=permutes[i][9];
            if(!checkBomb(permutes[i], 7))
                continue;
            // check if remain connects combos
            if((c5 == c6) && (c7 == c5 || c8 == c5 || c9 == c5))
                continue;
            // ignore boring permutations
            if(i==0 || (i>0 && !skipPermute(i, [0,1])))
                answers.push([c2,c3,c4,c5,c7,c6,c2,c3,c4,c5,c8,c6,c2,c3,c4,c5,c9,c6,c2,c1,c1,c1,c1,c1,c0,c0,c0,c0,c0,c0]);
        }

        // 8 combo : 6,4,5,3,3,3,3, change 5-drop combo's position
        permutes = new Array();
        pickColor(count, [6,4,5,3,3,3,3], [[0,1], [0,3], [0,4], [1,2], [1,3], [2,3], [2,4], [2,5], [3,4], [4,5], [4,6], [5,6]]);
        for(var i=0; i<permutes.length; i++){
            var c0=permutes[i][0], c1 = permutes[i][1],c2 = permutes[i][2],c3 = permutes[i][3],c4 = permutes[i][4],c5 = permutes[i][5],c6 = permutes[i][6], c7 = permutes[i][7], c8=permutes[i][8], c9=permutes[i][9];
            if(!checkBomb(permutes[i], 7))
                continue;
            // ignore boring permutations
            if(i==0 || (i>0 && !skipPermute(i, [0,1])))
                answers.push([c1,c2,c2,c2,c2,c2,c1,c3,c4,c5,c5,c5,c1,c3,c4,c6,c6,c6,c1,c3,c4,c7,c8,c9,c0,c0,c0,c0,c0,c0]);
        }
    }
    else if(maxCombo == 9){
        // 9 combo : 6,6,3,3,3,3,3
        permutes = new Array();
        pickColor(count, [6,6,3,3,3,3,3], [[0,1], [1,2], [1,3], [1,4], [1,5], [1,6], [2,3], [3,4], [4,5], [5,6]]);
        for(var i=0; i<permutes.length; i++){
            var c0=permutes[i][0], c1 = permutes[i][1],c2 = permutes[i][2],c3 = permutes[i][3],c4 = permutes[i][4],c5 = permutes[i][5],c6 = permutes[i][6], c7 = permutes[i][7], c8=permutes[i][8], c9=permutes[i][9];
            if(!checkBomb(permutes[i], 7))
                continue;
            // ignore boring permutations
            if(i==0 || (i>0 && !skipPermute(i, [0,1])))
                answers.push([c2,c3,c4,c5,c6,c7,c2,c3,c4,c5,c6,c8,c2,c3,c4,c5,c6,c9,c1,c1,c1,c1,c1,c1,c0,c0,c0,c0,c0,c0]);
        }
        
        // 9 combo : 5, 5, 5, 3, 3, 3, 3
        permutes = new Array();
        pickColor(count, [5,5,5,3,3,3,3], [[0,1], [1,2], [2,3], [2,4], [2,5],[2,6], [3,4], [4,5], [5,6]]);
        for(var i=0; i<permutes.length; i++){
            var c0=permutes[i][0], c1 = permutes[i][1],c2 = permutes[i][2],c3 = permutes[i][3],c4 = permutes[i][4],c5 = permutes[i][5],c6 = permutes[i][6], c7 = permutes[i][7], c8=permutes[i][8], c9=permutes[i][9];
            if(!checkBomb(permutes[i], 7))
                continue;
            if(i==0 || (i>0 && !skipPermute(i, [0,1])))
                answers.push([c0,c1,c2,c3,c3,c3,c0,c1,c2,c4,c4,c4,c0,c1,c2,c5,c5,c5,c0,c1,c2,c6,c6,c6,c0,c1,c2,c7,c8,c9]);
        }
    }
    else if(maxCombo == 10){
        // 10 combo : 6,6,6,3,3,3,3
        permutes = new Array();
        pickColor(count, [6,6,6,3,3,3,3], [[0,1], [1,2], [1,3], [1,4], [1,5], [1,6], [2,3], [3,4], [4,5], [5,6]]);
        for(var i=0; i<permutes.length; i++){
            var c0=permutes[i][0], c1 = permutes[i][1],c2 = permutes[i][2],c3 = permutes[i][3],c4 = permutes[i][4],c5 = permutes[i][5],c6 = permutes[i][6];
            if(!checkBomb(permutes[i], 7))
                continue;
            // ignore boring permutations
            if(i==0 || (i>0 && !skipPermute(i, [0,1])))
                answers.push([c2,c2,c3,c4,c5,c6,c2,c2,c3,c4,c5,c6,c2,c2,c3,c4,c5,c6,c1,c1,c1,c1,c1,c1,c0,c0,c0,c0,c0,c0]);
        }
    }
}


function pickColor(remain, combo, rules){
    function dfs(curAns, curCombo){
        if (Math.min(...remain) < 0)
            return;
        // check the neighbors spcified in rules to be different
        for(var i=0; i<rules.length; i++){
            if(curCombo > Math.max(rules[i][0], rules[i][1])){
                if(curAns[rules[i][0]] == curAns[rules[i][1]])
                    return;
            }
        }
        // found a valid solution
        if(curCombo == combo.length){
            // use the remain drops
            for(var i=0; i<remain.length; i++){
                for(var r=remain[i]; r>0; r--)
                    curAns.push(i);
            }
            permutes.push(curAns);
            return;
        }
        // backtracking
        for(var i=0; i<remain.length; i++){
            if(remain[i] >= combo[curCombo]){
                remain[i] -= combo[curCombo];
                dfs(curAns.concat([i]), curCombo+1);
                remain[i] += combo[curCombo];
            }
        }
    }
    dfs([], 0);
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter == '' ? '0' : urlparameter;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                                             vars[key] = value;
                                             });
    return vars;
}

function setCount() {
    // set the count using URL variables
    const array = ['fire_count', 'water_count', 'wood_count', 'light_count', 'dark_count', 'health_count', 'poison_count', 'sPoison_count', 'jiama_count', 'bomb_count'];
    // check if there's weird stuff in url
    for(var i = 0; i < array.length; i++){
        if(getUrlParam(array[i], 0).length > 2){
            if($.session.get('language') == 'ch')
                alert('請不要玩URL QQ');
            else if($.session.get('language') == 'jp')
                alert('URLを変換しないでください><');
            else
                alert('Please do not play with URL QQ');
            return;
        }
    }
    array.forEach(item => document.getElementById(item).value = getUrlParam(item, 0));
}

function drawOrbs(board) {
    // add new drop inside board
    var src = ['images/fire.png', 'images/water.png', 'images/wood.png', 'images/light.png', 'images/dark.png', 'images/health.png', 'images/poison.png', 'images/sPoison.png', 'images/jiama.png', 'images/bomb.png'];
    for(var i=0; i<30; i++){
        var type = board[i];
        var img = document.createElement("img");
        img.src = src[type];
        // 41 should work for mobile
        
        
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
            img.width = 45;
        else{
            img.width = 60;
        }
        var cur_slot = 'slot' + i.toString();
        document.getElementById(cur_slot).appendChild(img);
    }
}

function resetBoard() {
    
    /*
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
        document.getElementById('screenshot').width = 270;
    else
        document.getElementById('screenshot').width = 400;
    */
   // no more screenshot BabyRage
    //if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
        //document.getElementById('screenshot').height = document.getElementById('screenshot').width * 1.107;

    for(var i=0; i<30; i++){
        var cur_slot = 'slot' + i.toString();
        document.getElementById(cur_slot).innerHTML='';
    }
}

var drawed = 0;

function drawNext(){
    resetBoard();
    if(drawed >= answers.length){
        if($.session.get('language') == 'ch')
            alert('沒有其他解了，從第一個解法重新開始');
        else if($.session.get('language') == 'en')
            alert('No other solution. Start from the first one.');
        else if($.session.get('language') == 'jp')
            alert('他のドロップの配置はありません、最初の配置からやり直す');
        drawed = 0;
    }
    /*
    for(var i=0; i<30; i++){
        addDrop(answers[drawed][i]);
    }
    */
    drawOrbs(answers[drawed]);
    drawed++;
}

function skipPermute(i, toCheck){
    var skip = true;
    for(var j=0; j<toCheck.length; j++){
        if(permutes[i][toCheck[j]] != permutes[i-1][toCheck[j]])
            skip = false;
    }
    return skip;
}

function checkBomb(permute, remain){
    var valid = true;
    var bombCombo = 0;
    for(var i = 0; i < permute.length; i++){
        // if bomb in remain : invalid
        if(i >= remain && permute[i] == 9)
            valid = false;
        if(permute[i] == 9)
            bombCombo++;
    }
    // bomb cannot appear in two different combos
    return valid && bombCombo < 2;
}

var changeByHtml = ['title', 'main', 'references', 'view-p', 'twoColor-h', 'threeColor-h', 'multiColor-h', 'contact-h', 'website-h','twoColor-r','threeColor-r', 'multiColor-r','threeColor-p','multiColor-p','website-r1','website-r2','website-r3','contact-p1', '7C-p', '8C-p', '9C-p', '10C-p'];
var changeByVal = ['calculate', 'next'];
var languagePack = {
    'title':{'ch':'龍族拼圖 阿門小幫手', 'en':'Puzzle & Dragons Amen Helper', 'jp':'パズドラ アメン助手'},
    'main':{'ch':'主頁面', 'en':'Main Page', 'jp':'ホームページ'},
    'references':{'ch':'參考資料 & 聯絡', 'en':'References & Contact', 'jp':'参考資料 & お問い合わせ'},
    'contact-h':{'ch':'聯絡', 'en':'Contact', 'jp':'お問い合わせ'},
    'calculate':{'ch':'開始計算', 'en':'Calculate', 'jp':'計算'},
    'next':{'ch':'其他解法', 'en':'Next Solution', 'jp':'次盤面へ'},
    'view-p':{'ch':'瀏覽人數', 'en':'Views', 'jp':'訪問者数'},
    'twoColor-h': {'ch':'雙色', 'en':'Two Colors', 'jp':'2色陣'},
    'threeColor-h':{'ch':'三色', 'en':'Three Colors', 'jp':'3色陣'},
    'multiColor-h':{'ch':'多色', 'en':'More Colors', 'jp':'多色'},
    'website-h':{'ch':'其他參考資料', 'en':'Other References', 'jp':'その他の参考資料'},
    'twoColor-r':{'ch':'參考連結:', 'en': 'Reference:', 'jp':'参考リンク:'},
    'threeColor-r':{'ch':'參考連結:', 'en': 'Reference:', 'jp':'参考リンク:'},
    'multiColor-r':{'ch':'參考連結:', 'en': 'Reference:', 'jp':'参考リンク:'},
    'threeColor-p':{'ch':'先轉下兩排4 combo， 轉一橫排蓋住，再做剩下2 combo。', 'en':'First make four combos at the bottom. Cover them by a row. Finally make two combos at the top.', 'jp':'最初に2色を選び、下2段を組んで、上の3段を3コンボ。'},
    'multiColor-p':{'ch':'先算出最大combo數，根據結果對應不同轉法。', 'en':'First calculate the maximum possible combos. And then solve the puzzle accordingly.', 'jp':'盤面最大コンボ数を数える、そしてドロップを配置する。'},
    'website-r1':{'ch':'網頁模版', 'en':'Website\'s Template', 'jp':'Webテンプレート'},
    'website-r2':{'ch':'jQuery Session', 'en':'jQuery Session', 'jp':'jQuery セッション'},
    'website-r3':{'ch':'人氣計數器', 'en':'Hits Counter', 'jp':'訪問回数カウンター'},
    'contact-p1':{'ch':'email: joeychang0204@gmail.com</br>github: https://github.com/joeychang0204/Puzzle-And-Dragons-Amen-Helper</br>twitter: https://twitter.com/joeychang0204/status/1149024605182537730', 'en':'email: joeychang0204@gmail.com</br>github: https://github.com/joeychang0204/Puzzle-And-Dragons-Amen-Helper</br>twitter: https://twitter.com/joeychang0204/status/1149024605182537730', 'jp':'メイル: joeychang0204@gmail.com</br>github: https://github.com/joeychang0204/Puzzle-And-Dragons-Amen-Helper</br>ツイッター: https://twitter.com/joeychang0204/status/1149024605182537730'},
    '7C-p':{'ch':'7 Combo: ', 'en':'7 Combo: ', 'jp': '7コンボ: '},
    '8C-p':{'ch':'8 Combo: ', 'en':'8 Combo: ', 'jp': '8コンボ: '},
    '9C-p':{'ch':'9 Combo: ', 'en':'9 Combo: ', 'jp': '9コンボ: '},
    '10C-p':{'ch':'10 Combo: ', 'en':'10 Combo: ', 'jp': '10コンボ: '}
    //'':{'ch':'', 'en':'', 'jp':''},
}

$(document).ready(function() {
    if(typeof($.session.get('language')) == 'undefined'){
        setLanguage('undefined');
        updateCount();
    }
    else
        setLanguage($.session.get('language'));
    getPrevCount();
    $('#ch').click(function(){ setLanguage('ch'); return false; });
    $('#en').click(function(){ setLanguage('en'); return false; });
    $('#jp').click(function(){ setLanguage('jp'); return false; });
});


function setLanguage(lan){
    if(lan == 'undefined'){
        var naviLan = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
        //alert(naviLan);
        if(naviLan.includes('ja') || naviLan.includes('jp'))
            lan = 'jp';
        else if(naviLan.includes('zh') || naviLan.includes('ch'))
            lan = 'ch';
        else
            lan = 'en';
    }
    //alert(lan);
    
    $.session.set('language', lan);
    changeByHtml.forEach(item => document.getElementById(item).innerHTML = languagePack[item][lan]);
    changeByVal.forEach(item => document.getElementById(item).value = languagePack[item][lan]);
    
}


async function getPrevCount(){
    // send http request to get views
    var req = new XMLHttpRequest();
    var url = '/getViews';

    req.open('GET',url,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);

    req.send();

    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        // access your data newly received data here and update your DOM with appendChild(), findElementById(), etc...
        var messageToDisplay = parsedResponse['views'];
        document.getElementById('counter').innerHTML = parsedResponse['views'].toString();
        setCounter();
        // append child (with text value of messageToDisplay for instance) here or do some more stuff
    }
}

function updateCount(){
    // send http request to get views
    var req = new XMLHttpRequest();
    var url = '/updateViews';
    
    req.open('GET',url,true); // set this to POST if you would like
    req.send();
}

function setCounter(){
$('.counter-count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    },  {
            duration: 1000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
     });
}
