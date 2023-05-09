import { ReportEntity } from '../reports/reports.entity';
import { Factory } from 'typeorm-factory'
 
// const CommentFactory = new Factory(Comment)
//   .sequence("text", (i) => `text ${i}`)
//   .attr("authorName", "John Doe");
 
// const AuthorFactory = new Factory(Author)
//   .sequence("firstName", (i) => `John ${i}`)
//   .sequence("lastName", (i) => `Doe ${i}`);
 
const ReportFactory = new Factory(ReportEntity)
//   .attr("likesCount", 10)
//   .assocMany("comments", CommentFactory, 2)
//   .assocOne("author", AuthorFactory);
 
const build = async () => {
    console.log(await ReportFactory.create());
    
//   console.log(await PostFactory.build())
//   console.log(await PostFactory.build({ text: 'Foo' }))
//   console.log(await PostFactory.buildList(10))
 
//   console.log(await PostFactory.create({ author: AuthorFactory.create() }))
//   console.log(await PostFactory.createList(1))
}
 
build()