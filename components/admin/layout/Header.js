const Header = ({logout}) => {
    return (
        <header className="bg-green-500 py-3 px-5">
            <div className="flex justify-between">
                <div>
                    <h1 className="">IREADIFY</h1>
                </div>
                <div>
                    <button type="submit" onClick={ () => logout()} className="w-30 bg-gray-800 text-gray-100 text-sm px-3 py-1 rounded hover:bg-gray-700">Log Out</button>
                </div>
            </div>   
        </header>        
    )
}

export default Header