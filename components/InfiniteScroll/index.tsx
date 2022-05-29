import { MutableRefObject, useEffect } from 'react';

type CustomProps = {
  handleScroll: () => void;
  target: MutableRefObject<any>;
  className?: string;
  children: any;
  root: MutableRefObject<any>;
};

const InfiniteScroll = (props: CustomProps) => {
  const handleObserver = (entities: any[]) => {
    entities.forEach(e => {
      if (e.isIntersecting) {
        props.handleScroll();
      }
    });
  };

  useEffect(() => {
    if (props.root.current) {
      const observer = new IntersectionObserver(handleObserver, {
        root: props.root.current,
        rootMargin: '0px',
        threshold: 1.0
      });

      if (props.target.current) {
        observer.observe(props.target.current);
      }
    }
  }, [props.root]);

  return (
    <div className={props.className} ref={props.root}>
      {props.children}
    </div>
  );
};

export default InfiniteScroll;
