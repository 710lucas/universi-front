
import UniversimeApi from "@/services/UniversimeApi";
import { Content } from "@/types/Capacity"
import { useEffect, useState } from "react"
import StarRating from "../StarRating/StarRating";
import { Link } from "react-router-dom";

export function InfoDisplay(){

    const [availableContents, setAvailableContents] = useState<Content[]>([]);
    const [displayContents, setDisplayContents] = useState<Content[]>([])

    useEffect(() =>{
        UniversimeApi.Capacity.contentList()
        .then(res => setAvailableContents(res.body.contents))
    }, [])

  useEffect(() => {
    const extractVideoId = (url: string) => {
      const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[1].length === 11) {
        return match[1];
      }
    };

    const updateThumbnailImage = (thumbnail: { querySelector: (arg0: string) => { (): any; new(): any; 
        getAttribute: { (arg0: string): any; new(): any; }; setAttribute: { (arg0: string, arg1: string): 
        void; new(): any; }; }; }) => {
      const videoUrl = thumbnail.querySelector('img').getAttribute('src');
      const videoId = extractVideoId(videoUrl);
      if (videoId) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
        thumbnail.querySelector('img').setAttribute('src', thumbnailUrl);
      }
    };

    const contentThumbnails = document.querySelectorAll('.content-thumbnail');
    contentThumbnails.forEach(updateThumbnailImage);
  }, [availableContents, displayContents]);

    function handleClick(){
        if(availableContents.length > displayContents.length)
            setDisplayContents(availableContents);
    }


    useEffect(()=>{
        setDisplayContents(availableContents.slice(1, 10))
    }, [availableContents])

    
    return(
        <div>
        <div id="conteudo-folder">
          <h1 id="subtitle-folder">Conteúdos:</h1>
          <div className="content-list-all">
            {
            availableContents.length === 0 ? <p className="empty">Nenhum conteúdo nessa pasta</p> :


            displayContents.map((content) => (
              <div key={content.id} className="content-item">
                <div className="content-thumbnail">
                  <Link to={`/capacitacao/play/${content.id}`}>
                    <img
                      className="content-image"
                      src={content.url}
                      alt="Thumbnail do conteúdo"
                    />
                  </Link>
                </div>
                <div>
                  <h3 className="content-title">
                    {content.title.length > 48
                      ? `${content.title.substring(0, 48)}...`
                      : content.title}
                  </h3>
                </div>
                <div className="content-rating">
                <p className="content-rating">
                  <span className="rating-count">{content.rating.toFixed(1)}</span>
                  <span className="star-rating">
                    <StarRating rating={content.rating} />
                  </span>
                </p>
                </div>
              </div>
            ))}
          </div>
            {
                availableContents.length > displayContents.length ?
                (
                    <div className="content-list-all">
                        <a onClick={handleClick}>Ver mais...</a>
                    </div>
                )
                : <></>
            }
        </div>
        </div>

    )

}