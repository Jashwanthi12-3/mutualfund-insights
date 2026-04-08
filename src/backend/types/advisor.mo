import Common "common";

module {
  public type ArticleId = Common.ArticleId;
  public type Timestamp = Common.Timestamp;

  public type Article = {
    id : ArticleId;
    title : Text;
    content : Text;
    authorPrincipal : Principal;
    authorName : Text;
    publishedAt : Timestamp;
    category : Text;
  };

  public type PostArticleRequest = {
    title : Text;
    content : Text;
    category : Text;
  };
};
