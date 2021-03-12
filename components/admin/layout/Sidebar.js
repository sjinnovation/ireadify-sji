import ActiveLink from './ActiveLink'

const Sidebar = () => {
    return (
        <aside id="sidebar" className="lg:w-1/6 bg-gray-100 py-2 px-3">
            <style jsx>{`
                    .active {
                       color: white;
                       background: black
                    }
                `}</style>
            <ul className="flex flex-col">
                <ActiveLink activeClassName="active" href="/admin/users">
                    <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white cursor-pointer">
                        <a>List Users</a>
                    </li>
                </ActiveLink>

                <ActiveLink activeClassName="active" href="/admin/author">
                    <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white cursor-pointer">
                        <a>List Authors</a>
                    </li>
                </ActiveLink>

                <ActiveLink activeClassName="active" href="/admin/author/add">
                    <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white cursor-pointer">
                        <a>Add Author</a>
                    </li>
                </ActiveLink>

                <ActiveLink activeClassName="active" href="/admin/language">
                    <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white cursor-pointer">
                        <a>List Languages</a>
                    </li>
                </ActiveLink>

                <ActiveLink activeClassName="active" href="/admin/book/add">
                    <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white cursor-pointer">
                        <a>Add Book</a>
                    </li>
                </ActiveLink>

                <ActiveLink activeClassName="active" href="/admin/book">
                    <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white cursor-pointer">
                        <a>List Books</a>
                    </li>
                </ActiveLink>

                <ActiveLink activeClassName="active" href="/admin/video/add">
                    <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white cursor-pointer">
                        <a>Add Video</a>
                    </li>
                </ActiveLink>

                <ActiveLink activeClassName="active" href="/admin/video">
                    <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white cursor-pointer">
                        <a>List Videos</a>
                    </li>
                </ActiveLink>

                <ActiveLink activeClassName="active" href="/admin/contactUs">
                    <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white cursor-pointer">
                        <a>Contact Us</a>
                    </li>
                </ActiveLink>

                <ActiveLink activeClassName="active" href="/admin/testimonial/add">
                    <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white cursor-pointer">
                        <a>Add Testimonials</a>
                    </li>
                </ActiveLink>

                <ActiveLink activeClassName="active" href="/admin/testimonial">
                    <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white cursor-pointer">
                        <a>List Testimonials</a>
                    </li>
                </ActiveLink>

                <ActiveLink activeClassName="active" href="/admin/faq">
                    <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white cursor-pointer">
                        <a>FAQ</a>
                    </li>
                </ActiveLink>

                <ActiveLink activeClassName="active" href="/admin/aboutUs">
                    <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white cursor-pointer">
                        <a>About Us</a>
                    </li>
                </ActiveLink>

                <ActiveLink activeClassName="active" href="/admin/privacy">
                    <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white cursor-pointer">
                        <a>Privacy Policy</a>
                    </li>
                </ActiveLink>

                <ActiveLink activeClassName="active" href="/admin/termsConditions">
                    <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white cursor-pointer">
                        <a>Terms & Conditions</a>
                    </li>
                </ActiveLink>
            </ul>
        </aside>

    )
}

export default Sidebar
