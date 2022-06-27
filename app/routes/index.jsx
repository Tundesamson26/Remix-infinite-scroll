import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageCard from "../component/ImageCard";

export default function Index() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  const getMoreImages = async () => {
    const response = await fetch(
      `https://pixabay.com/api/?key=28274496-3bdf93c17f9c5ce8ae06b86fd&q=yellow+flowers&image_type=photo&pretty=true?_start=${images.length}&_limit=10`
    );
    const newImages = await response.json();
    setImages([...images, ...newImages.hits]);
    setIsLoading(false);
  }

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=28274496-3bdf93c17f9c5ce8ae06b86fd&q=yellow+flowers&image_type=photo&pretty=true?_limit=10`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setImages(data.hits);
        setIsLoading(false);
      }).catch(err => console.log(err));
  }, [term])

  return (
    <div className="container mx-auto">
      <InfiniteScroll
        dataLength={images.length} //This is important field to render the next data
        next={getMoreImages}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="grid grid-cols-3 gap-4">
          {images.map(image => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}


