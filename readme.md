/feed -> one card which contains top companies list withan option of view all which takes it to /interview/popular-companies
    -> another card which shows Experiences with most likes and comments

When I click on any company like for ex-amazon from top company, new page comes with URL /experience/popular-companies/Amazon
    it shows two filter options one is (Difficulty -> Easy Medium Hard) another is (All, Bookmarks) and on the right side sort(Latest, Most liked);

    one card shows a thumbnail like card with only few details 
    and when we click on that card we go to /interview/amazon-interview-experience-9-dce9 which shows complete experience information

/experience -> {Done}
    /experience ---------- create
    /interview/:slug ----- Get full detail
    /experience/:id ----- Update
    /experience/:id ----- Delete

/feed -> 
   Get /experience/feed ------------------------ Home Feed
   Get /experience/popular-companies ---------- All Companies
    Get /experience/popular-companies/:company - Filtered List per copany

/like -> {Done}
    Post /experience/:id/like ------ Like
    Delete /experience/:id/like ----- Unlike

/comment {Done}
   Get   /experience/:id/comments ------ List Comments
   Post  /experience/:id/comment -----  Add Comment
   Delete /experience/:id/comment/:commentId - Delete Comment

/bookmark
    Get   /bookmark ------ List own bookmarks
    Post  /bookmark/:experienceId -----  Add Bookmarks
    Delete /bookmark/:experienceId ---- Remove Bookmarks
    
