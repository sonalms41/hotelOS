import React, { useState, useEffect, useContext } from "react";
import ImageGallery from "react-image-gallery";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ConnectingImageGallery = (props) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(null);
  const [initialThumbnailIndex, setInitialThumbnailIndex] = useState(null);

  const {
    propertyId,
    showIndex,
    slideOnThumbnailOver,
    infinite,
    images,
    galleryTitle,
    autoPlay,
    disableThumbnailScroll,
    startIndex,
    showPlayButton,
    closeGallery,
    initialTabIndex,
    startThumbnailIndex,
  } = props;

  const handleSelectedTabInde = (tabIndex) => {
    setSelectedTabIndex(tabIndex);
    setInitialThumbnailIndex(0);
    console.log(tabIndex);
  };
  return (
    <>
      <div id="connecting-image-gallery">
        {/*<div className="connecting-gallery-header">
				<h2 className="gallery-title">{galleryTitle}</h2>
			</div>*/}

        <div className="connecting-gallery-body">
          <Tabs
            className="gallery-filter-nav-wrapper"
            defaultFocus={true}
            selectedIndex={
              selectedTabIndex !== null ? selectedTabIndex : initialTabIndex
            }
            onSelect={(tabIndex) => handleSelectedTabInde(tabIndex)}
          >
            {/*Display image tag-name with total number of images under the particular image tag*/}
            <TabList className="gallery-filter-nav">
              <div className="gallery-filter-nav__lists">
                {images &&
                  images.map((photo, i) => {
                    return (
                      <Tab
                        key={`lfdasflsdj-${i}`}
                        className="gallery-filter-nav__item"
                      >
                        {photo.tags}({[photo.images.length]})
                      </Tab>
                    );
                  })}
              </div>
              <button className="button-close-gallery" onClick={closeGallery}>
                x
              </button>
            </TabList>

            {/*Display images  under the particular image tag*/}
            {images &&
              images.map((arrayOfImages, i) => {
                return (
                  <TabPanel key={`werwrer-${i}`} className="filter-result">
                    <ImageGallery
                      items={arrayOfImages.images.map((image, i) => {
                        return {
                          original: `${process.env.REACT_APP_API_BASE_URL}${image}`,
                          thumbnail: `${process.env.REACT_APP_API_BASE_URL}${image}`,
                        };
                      })}
                      showIndex={showIndex ? showIndex : false}
                      slideOnThumbnailOver={
                        slideOnThumbnailOver ? slideOnThumbnailOver : false
                      }
                      infinite={infinite ? infinite : true}
                      originalClass="connecting-gallery-image"
                      autoPlay={autoPlay}
                      disableThumbnailScroll={false}
                      startIndex={
                        initialThumbnailIndex !== null
                          ? initialThumbnailIndex
                          : startThumbnailIndex
                      }
                      showPlayButton={showPlayButton}
                      showFullscreenButton={false}
                    />
                  </TabPanel>
                );
              })}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ConnectingImageGallery;
