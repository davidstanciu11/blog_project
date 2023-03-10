import { useState, useEffect } from "react";
import { Spinner, Input, Row, Button, Badge } from "reactstrap";
import "./Blogs.style.css";
import BlogComponent from "../components/BlogComponents";

function Blogs() {
	const [blogList, setBlogList] = useState(null);
	const [userList, setUserList] = useState(null);
	const [textInput, setTextInput] = useState("");
	const [selectedUser, setSelectedUser] = useState("");

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts")
			.then((res) => res.json())
			.then((blogListAPI) => setBlogList(blogListAPI));

		fetch("https://jsonplaceholder.typicode.com/users")
			.then((res) => res.json())
			.then((userListAPI) => setUserList(userListAPI));
	}, []);
	return (
		<>
			{blogList && userList ? (
				<div className='d-flex'>
					<div className='user_list m-4 d-flex flex-column'>
						<h2>User List</h2>
						{userList.map((user, index) => {
							return (
								<Badge
									pill
									key={"user_" + index}
                                    color={user.id === selectedUser? "primary" : "secondary"}
									onClick={() => {
										setSelectedUser(user.id);
									}}>
									{user.id} - {user.name}
								</Badge>
							);
						})}
						<Button></Button>
					</div>
					<div className='blog_list'>
						<h2>Search</h2>
						<Input
							className='w-25'
							value={textInput}
							onChange={(event) => {
								setTextInput(event.target.value);
							}}
						/>
						<Row>
							{blogList
                            .filter((blog) => {
                                return selectedUser && selectedUser === blog.userId
                            })
								.filter((blog) => {
									return (
										blog.body.includes(textInput) ||
										blog.title.includes(textInput)
									);
								})
								.map((blog, index) => {
									return <BlogComponent blog={blog} key={"blog_" + index} />;
								})}
						</Row>
					</div>
				</div>
			) : (
				<Spinner>Loading...</Spinner>
			)}
		</>
	);
}

export default Blogs;
