function view_summary(ele){
  var con = document.getElementById(ele).style.display;
  if (con.localeCompare("none") == 0){
    document.getElementById(ele).style.display = "block";
  }
  else{
    document.getElementById(ele).style.display = "none";
  }
};

function display_job_detail(ele){
  var _disp_tag = document.getElementById('detail_tab');
  var _content_tab = document.getElementById(ele);
  _disp_tag.innerHTML = _content_tab.innerHTML;
  _disp_tag.children[0].children[3].style.display = "block";
  _disp_tag.children[0].children[4].style.display = "none";
}

window.start = 0;
window.path = '';
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const wait_for = async (stat, l_path) => {

  if (stat == 1){

    document.getElementById("loader-block").style.display = "block";
    await sleep(3000);
  }
  else{
    await sleep(3000);
    await sleep(3000);
    document.getElementById("loader-block").style.display = "none";
    window.path = l_path;
    display_data();
  } 
}


function next_page(){
  //donothing
  window.start+=5;
  display_data();
}
function previous_page(){
  //do nothing
  window.start-=5;
  display_data();
}

function display_data() {
  
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5000/get_file',
    data: {f_name: window.path, start: window.start},
    cache: false,
    success: function(resp){
      if (resp){

        if (resp['result'] == 1){
          //console.log(resp['data'])
          if (resp['data'].length > 0){

            var jdata = resp['data'];
            //var len = Object.keys(jdata['Company']).length;
            var len = jdata.length;

            var main = document.getElementById('display_tab');
            main.innerHTML= "";

            for (var i = 0; i < len; i+=1){
              var row_tag = document.createElement('div');
              row_tag.className = "row";

              for (var j = 0; j < 2; j+=1){
                if (i < len){

                  var col_tag = document.createElement('div');
                  col_tag.className = "col-md-6 ml-3";
                  

                  var card_tag = document.createElement('div');
                  card_tag.className = "card card-cascade wider mt-2";
                  card_tag.style = "width: 18rem;";
                  card_tag.setAttribute('id', "main_"+String(jdata[i]['id']));

                  var card_body = document.createElement('div');
                  card_body.className = "card-body";

                  var comp_tag = document.createElement('h5');
                  comp_tag.className = "job-company card-title";
                  comp_tag.textContent = jdata[i]['comp_name'];

                  card_body.appendChild(comp_tag);

                  var title_tag = document.createElement('h6');
                  title_tag.className = "job-title card-subtitle mb-2 text-muted";
                  title_tag.textContent = jdata[i]['title'];

                  card_body.appendChild(title_tag);

                  var loc_tag = document.createElement('h6');
                  loc_tag.className = "card-subtitle mb-2 text-muted";
                  loc_tag.textContent = jdata[i]['location'];

                  card_body.appendChild(loc_tag);

                  var summary_tag = document.createElement('p');
                  summary_tag.className = "job-description card-text mt-3";
                  summary_tag.style = "display: none;";
                  summary_tag.setAttribute('id', String(jdata[i]['id']));
                  summary_tag.textContent = jdata[i]['summary'];

                  var a_tag = document.createElement('a');
                  a_tag.className = "btn btn-primary";
                  a_tag.href = jdata[i]['link'];
                  a_tag.textContent = "Apply";
                  summary_tag.appendChild(document.createElement('br'))
                  summary_tag.appendChild(document.createElement('br'))
                  summary_tag.appendChild(a_tag);

                  card_body.appendChild(summary_tag);

                  var btn_tag = document.createElement('button');
                  btn_tag.className = "text-muted";
                  btn_tag.setAttribute('onclick', 'display_job_detail("main_'+String(jdata[i]['id'])+'")');
                  btn_tag.textContent = "more details";

                  card_body.appendChild(btn_tag);

                  card_tag.appendChild(card_body);

                  var foot = document.createElement('div');
                  foot.className = "card-footer text-muted text-center";
                  foot.textContent = jdata[i]['posting'];

                  card_tag.appendChild(foot);

                  col_tag.appendChild(card_tag);
                  row_tag.appendChild(col_tag);
                  //main.appendChild(card_tag);
                  i+=1;
                }
                else{
                  break;
                }
              }
              i-=1
              main.appendChild(row_tag);
            }

            display_job_detail("main_"+String(resp['data'][0]['id']));
            
            if (window.start == 0){
              var pager = document.getElementById('pager-tab');
              pager.innerHTML = '<nav aria-label="Page navigation">\
                <ul class="pagination justify-content-center">\
                  <li class="page-item disabled">\
                    <button class="page-link">Previous</button>\
                  </li>\
                  <li class="page-item">\
                    <button class="page-link" onclick="next_page()">Next</button>\
                  </li>\
                </ul>\
              </nav>'

            }
            else{

              var pager = document.getElementById('pager-tab');
              pager.innerHTML = '<nav aria-label="Page navigation">\
                <ul class="pagination justify-content-center">\
                  <li class="page-item">\
                    <button class="page-link" onclick="previous_page()">Previous</button>\
                  </li>\
                  <li class="page-item">\
                    <button class="page-link"  onclick="next_page()">Next</button>\
                  </li>\
                </ul>\
              </nav>'
            }
          }
          else{
              var pager = document.getElementById('pager-tab');
              pager.innerHTML = '<nav aria-label="Page navigation">\
                <ul class="pagination justify-content-center">\
                  <li class="page-item">\
                    <button class="page-link" onclick="previous_page()" href="">Previous</button>\
                  </li>\
                  <li class="page-item disabled">\
                    <button class="page-link disabled" href="">Next</button>\
                  </li>\
                </ul>\
              </nav>'
          }
        }
        else if (resp['result'] == 0){
          var main = document.getElementById('fetch_err');
          main.style.display = "block";
          main.innerHTML = "Search result not found";
        }
      }
    },
    error: function(request, status, error){
      console.log(error);
    }
  });
} 

function search_job(){

  var key = document.getElementById("key").value;
  var loc = document.getElementById("loc").value;

  var key_check=true;
  var loc_check=true;

  if (key == ""){
    $("#errkey")
    .text("Please enter job type")
    .show()
    .fadeOut(4000);
    key_check=false;
  }
  if(loc == ""){
    $("#errloc")
    .text("Please enter location")
    .show()
    .fadeOut(4000);
    loc_check=false;
    return;
  }

  if (key_check && loc_check){
    wait_for(1, '');
    var data = {
      job: key,
      location: loc
    }
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5000/search_data',
      data: data,
      cache: false,
      success: function(resp){
       // document.getElementById('display_tab').innerHTML = JSON.stringify(resp);
        if (resp){

          if (resp['result'] == '1'){
            if (resp['status'].localeCompare('created') == 0){
              wait_for(0, resp['path']);
            }
            else if (resp['status'].localeCompare('exists') == 0){
              wait_for(0, resp['path']);
            }
          }
        }
      },
      error: function(request, status, error){
        document.getElementById('loader-block').style.display = "none";
        document.getElementById('fetch_err').innerHTML = 'error : '+ String(error);
      }
    });
  }

}