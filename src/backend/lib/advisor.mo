import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Types "../types/advisor";

module {
  public type Article = Types.Article;
  public type ArticleId = Types.ArticleId;
  public type PostArticleRequest = Types.PostArticleRequest;

  public func postArticle(
    _articles : List.List<Article>,
    _nextId : Nat,
    _caller : Principal,
    _authorName : Text,
    _req : PostArticleRequest,
  ) : Article {
    Runtime.trap("not implemented");
  };

  public func getArticles(_articles : List.List<Article>) : [Article] {
    Runtime.trap("not implemented");
  };
};
