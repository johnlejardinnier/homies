/**
 * Created by jonathan on 09/01/17.
 */
var last_post = 0;

// alert('test');

function ajaxGetPosts() {

    var options = {};

    options.data = {last:last_post};

    ajaxRequest("ajaxGetWallPosts", options, function (result) {

        if(result != undefined) {

            if(result.length > 0 && result[result.length - 1].id != undefined) {

                last_post = result[result.length - 1].id;

                createCards(result, $("#posts"));

            } else {
                //$("#posts").append("No posts");
            }

        }

    }, function () {
        console.log("Error get posts");
    });

}


function createCards(result, container) {

    result.forEach(function (item) {

        var post_id = '';

        var parent_id = '';
        var parent_avatar = default_avatar;
        var parent_firstname = 'undefined';
        var parent_lastname = 'name';

        var post_likes = 0;


        if(item != undefined) {
            post_id = item.id;

            if(item.aime != undefined && item.aime > 0) {
                //console.log(item.aime);
                post_likes = item.aime;
            }

        }

        if(item.parent != undefined) {
            parent_id = item.parent.id;
            parent_firstname = item.parent.prenom;
            parent_lastname =   item.parent.nom;

            if (item.parent.avatar != undefined && item.parent.avatar.length > 0) {

                if(urlExists(item.parent.avatar)) {
                    parent_avatar = item.parent.avatar;
                }

            }



        }

        var e_id = '';
        var e_avatar = default_avatar;
        var e_firstname = 'undefined';
        var e_lastname = 'name';

        var r_id = '';
        var r_avatar = default_avatar;
        var r_firstname = 'undefined';
        var r_lastname = 'name';



        var post_text = '...';
        var post_img = '';
        var post_date = 'undefined date';
        var auto_post = '';





        if(item.emetteur != undefined) {

            e_id = item.emetteur.id;
            e_firstname = item.emetteur.prenom;
            e_lastname =   item.emetteur.nom;

            if (item.emetteur.avatar != undefined && item.emetteur.avatar.length > 0) {

                if(urlExists(item.emetteur.avatar)) {
                    e_avatar = item.emetteur.avatar;
                }

            }


        }


        if(item.destinataire != undefined) {

            r_id = item.destinataire.id;
            r_firstname = item.destinataire.prenom;
            r_lastname =   item.destinataire.nom;

            if (item.destinataire.avatar != undefined && item.destinataire.avatar.length > 0) {

                if(urlExists(item.destinataire.avatar)) {
                    r_avatar = item.destinataire.avatar;
                }

            }

        }


        if(item.post != undefined) {

            //var msg_date = item.post.date;

            if(item.post.texte != undefined) {

                var msg = $.trim(item.post.texte);

                if(msg.length > 0 && msg != ' ') {
                    post_text = escapeHtml(msg);
                }

            }


            if (item.post.image != undefined && item.post.image.length > 0) {

                //if(urlExists(item.post.image)) {
                //     post_img = item.post.image;
                    post_img = '<img src="'+item.post.image+'" alt="" class="img-rounded img-responsive"> ';

                //}

            }

            if(item.post.date != undefined) {
                post_date = item.post.date;
            }

        }


        if(e_id == r_id) {
            auto_post = '<span class="text-gray"> has published on his wall.</span>';
        } else {
            auto_post = '<i class="material-icons icon-min">play_arrow</i>' +
            '<a href="'+profile_link + r_id +'">' +
            '<span class="text-bold">'+ r_firstname + ' ' + r_lastname+'</span>' +
            '</a>';
        }

        var html = '';

        if(parent_id == e_id) {

            // original post

            html = '<div class="card"> ' +
                '<div class="content"> ' +

                    '<div class="author"> ' +
                        '<a href="'+profile_link + e_id +'"> ' +
                            '<img class="avatar img-rounded" src="'+e_avatar+'"> ' +
                            '<span class="text-bold">' +
                                e_firstname + ' ' + e_lastname +
                            '</span>' +
                        '</a>' +
                        auto_post +
                    '</div>' +

                    '<div class="card-description"> ' +
                        '<h3>'+post_text+'</h3> ' +
                        '<div class="image-container" style="margin: 15px 0;"> ' +
                            post_img +
                        '</div> ' +
                    '</div>' +


                    '<div class="div-btn-actions"> ' +
                        '<div class="content btn-action btn-group" role="group" aria-label="..."> ' +
                            '<button id="like_'+post_id+'" type="button" class="btn btn-default button-action btn-like"> ' +
                                '<label class="label-btn-action"><span class="badge">'+post_likes+'</span>Like</label> ' +
                            '<i class="material-icons icon-like">thumb_up</i> ' +
                            '</button> ' +
                            '<button type="button" class="btn btn-default button-action"> ' +
                                '<a href=""> ' +
                                    '<label class="label-btn-action">Share</label> ' +
                                    '<i class="material-icons">share</i> ' +
                                '</a> ' +
                            '</button> ' +
                        '</div> ' +
                        '<span class="content content-date">Posted on '+ post_date +'</span> ' +
                    '</div>' +


                '</div>' +
            '</div>';

        } else {

            // shared post

            html = '<div class="card">' +
                '<div class="content"> ' +
                '<div class="author author-shared"> ' +
                '<a href="'+profile_link + e_id +'"> ' +
                '<img class="avatar img-rounded" src="'+e_avatar+'"> ' +
                '<span class="text-bold">'+e_firstname + ' ' + e_lastname+'</span> ' +
                '</a> ' +
                '<span class="text-gray"> has shared this post.</span> ' +
                '</div> ' +
                '<div class="card"> ' +
                '<div class="content"> ' +
                '<div class="author"> ' +
                '<a href="'+profile_link + parent_id+'"> ' +
                '<img class="avatar img-rounded" src="'+parent_avatar+'"> ' +
                '<span class="text-bold">'+parent_firstname + ' ' + parent_lastname +'</span> ' +
                '</a> ' +
                '<i class="material-icons icon-min">play_arrow</i> ' +
                '<a href="'+ profile_link + r_id +'"> ' +
                '<span class="text-bold">'+r_firstname + ' ' + r_lastname +'</span> ' +
                '</a> ' +
                '</div> ' +
                '<span class="content grey-date">'+post_date+'</span> ' +
                '<div class="card-description"> ' +
                '<h3>'+post_text+'</h3> ' +
                '</div> ' +
                '</div> ' +
                '</div> ' +
                '<div class="div-btn-actions-shared"> ' +
                '<div class="content btn-action btn-group content-btn-actions-shared" role="group" aria-label="..."> ' +
                '<button id="like_'+post_id+'" type="button" class="btn btn-default button-action"> ' +
                '<label class="label-btn-action"><span class="badge">'+post_likes+'</span>Like</label> ' +
                '<i class="material-icons icon-like">thumb_up</i> ' +
                '</button> ' +
                '<button type="button" class="btn btn-default button-action"> ' +
                '<a href=""> ' +
                '<label class="label-btn-action">Share</label> ' +
                '<i class="material-icons">share</i> ' +
                '</a> ' +
                '</button> ' +
                '</div> ' +
                '</div> ' +
                '</div> ' +
                '</div>';

        }

        container.prepend(html);

    });


}

ajaxGetPosts();
setInterval(ajaxGetPosts, 5000);