import About from './About'
import Slider from './Slider'
import TopRatedBooks from './TopRatedBooks'
import Testimonial from './Testimonial'
import Features from './Features'
import Faq from './Faq'

const Home = () => {
    return (
    	<div>
		    <Slider />
	        <About />
	        <TopRatedBooks />
	        <Features />
	        <Testimonial />
	        <Faq />
		</div>   
    )
}

export default Home


