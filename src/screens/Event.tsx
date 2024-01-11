import { FC, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { StyledEventScreens } from '../styles/screens/Event';
import { useNavigate, useParams } from 'react-router-dom';
import { LeftArrow } from '../assets/svg';
import { IProductData } from '../models/event';
import { EventProductCard } from '../components/EventProductCard';
import { getProductCardStyles } from '../helpers/videoHelpers';
import { formattedTime } from '../helpers/formattedValue';
import {
  useCreateViewSessionMutation,
  useGetMainVideoAssetItemsQuery,
  useGetMainVideoAssetQuery,
  useSynkViewSessionMutation,
} from '../services/auth';

export type IVideoPlayer = ReactPlayer & { wrapper: HTMLElement };

export const Event: FC = () => {
  const navigate = useNavigate();
  const ref = useRef<IVideoPlayer>(null);
  const { eventId } = useParams();
  const { data: videoAsset } = useGetMainVideoAssetQuery({ id: eventId });
  const { data: videoAssetMoments } = useGetMainVideoAssetItemsQuery({ id: eventId });
  const [showPanel, setShowPanel] = useState(false);
  const [analiticsView, setAnaliticsView] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [currentSeek, setCurrentSeek] = useState<number>(0);
  const [screen, setScreen] = useState<{ width: number; height: number }>();

  const [initSessionAnalitics] = useCreateViewSessionMutation<{
    isLoading: boolean;
    isError: boolean;
  }>();

  const [updateIntervalAnalitics] = useSynkViewSessionMutation<{
    isLoading: boolean;
    isError: boolean;
  }>();

  const handleGetDuration = (duration: number) => {
    setTotalDuration(duration);
  };

  const handleProcess = ({ playedSeconds }: { playedSeconds: number }) => {
    if (!(Math.round(playedSeconds) % 2) && analiticsView) {
      updateIntervalAnalitics(analiticsView);
    }
    setCurrentSeek(playedSeconds);
  };

  const mousemove = () => {
    setShowPanel(true);

    setTimeout(() => {
      setShowPanel(false);
    }, 5000);
  };

  useEffect(() => {
    window.addEventListener('mousemove', mousemove);
    return () => window.removeEventListener('mousemove', mousemove);
  }, []);

  const wrapper = (ref as React.MutableRefObject<IVideoPlayer>)?.current?.wrapper;

  const initAnaliticsView = async () => {
    const response: any = await initSessionAnalitics(videoAsset?.landscape_asset_id);
    setAnaliticsView(response?.data);
  };

  return (
    <StyledEventScreens>
      <ReactPlayer
        className="player"
        url={videoAsset?.landscape_url}
        width="100%"
        height="100%"
        playing={isPlay && videoAsset?.landscape_url && videoAssetMoments?.items}
        playsinline
        stopOnUnmount
        currentSeek={currentSeek}
        onEnded={() => {
          setIsPlay(false);
          navigate(`/picked-items/${eventId}`);
        }}
        ref={ref}
        onDuration={handleGetDuration}
        onReady={() => {
          setIsPlay(true);
          setScreen({ width: wrapper?.clientWidth, height: wrapper.clientHeight });
          initAnaliticsView();
        }}
        onProgress={(e) => handleProcess(e)}
        onStart={() => {
          setScreen({ width: wrapper?.clientWidth, height: wrapper.clientHeight });
        }}
      />
      <div className="products-wrapper">
        {videoAssetMoments?.items?.length !== 0 &&
          videoAssetMoments?.items?.map((product: IProductData) => (
            <EventProductCard
              key={product.id}
              className="resize"
              eventId={eventId}
              productId={product.product_id}
              isPlay={
                currentSeek >= Math.trunc(Number(product.start)) &&
                currentSeek <= Math.trunc(Number(product.start)) + Math.trunc(Number(product.duration))
              }
              card={product}
              handleCardClick={() => console.log('test')}
              style={getProductCardStyles({
                currentSeek,
                item: product,
                clientWidth: screen?.width ?? wrapper?.clientWidth,
                clientHeight: screen?.height ?? wrapper?.clientHeight,
              })}
              startPos={{
                x: (screen?.width ?? wrapper?.clientWidth) * Number(product.offsetLeft),
                y: (screen?.height ?? wrapper?.clientHeight) * Number(product.offsetTop),
              }}
              currency={'usd'}
            />
          ))}
      </div>

      <div className={`header ${showPanel && 'showpanel'}`}>
        <div className="left-side">
          <button className="back-arrow" onClick={() => navigate(`/waiting-room/${eventId}`)}>
            <LeftArrow />
            <span>To Waiting Room</span>
          </button>
        </div>
      </div>
      <div className={`time-line-container ${showPanel && 'showpanel'}`}>
        <span>{formattedTime(currentSeek)}</span>
        <div className="time-line">
          <div
            className="time-line-progress"
            style={{ width: `${(Number((currentSeek / totalDuration).toFixed(2)) * 100).toString()}%` }}
          ></div>
        </div>
        <span>{formattedTime(totalDuration)}</span>
      </div>
    </StyledEventScreens>
  );
};

export default Event;
