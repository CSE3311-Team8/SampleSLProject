const ProjectList = (props) => {

  const items = props.items;
  const title = props.title;
  console.log(props.items)
  return ( 


    <div className="project-list">
      <h2>{title}</h2>
      {items.map((item)=>(
        <div className="project-preview" key ={item.id}>
          <h2>{item.repo_name} {item.owner_name}</h2>
          <p>{item.Description}</p>
        </div>
      ))}
    </div>
   );
}
 
export default ProjectList;

