import parse, { domToReact } from "html-react-parser";
import Image from "next/image";

export default function WpApiParser(props: { content: string; }) {

    const options = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        replace: (domNode: any) => {
            if (domNode.name === 'div' && domNode.attribs?.style) {

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { style, class: className, ...restAttribs } = domNode.attribs;
                return (
                    <div {...restAttribs} className={className} >
                        {domToReact(domNode.children, options)}
                    </div>
                );
            }
            if (domNode.name === 'p' && domNode?.parent?.name !== 'div') {
                return (
                    <p className="content" >
                        {domToReact(domNode.children, options)}
                    </p>
                );
            }
            if (domNode.name === 'strong' && domNode?.parent?.name !== 'h4') {
                return (
                    <strong className="content" >
                        {domToReact(domNode.children, options)}
                    </strong>
                );
            }
            if (domNode.name === 'h3') {
                return (
                    <h3 className="title" >
                        {domToReact(domNode.children, options)}
                    </h3>
                );
            }
            if (domNode.name === 'h3' || domNode.name === 'h4' || domNode.name === 'h5' || domNode.name === 'h6') {
                return (
                    <h4 className="title" >
                        {domToReact(domNode.children, options)}
                    </h4>
                );
            }
            if (domNode.name === 'img') {
                return (
                    <Image
                        src={domNode.attribs.src}
                        alt={domNode.attribs.alt}
                        width={700}
                        height={475}
                        className="w-full rounded-md"
                        style={{
                            height: "auto",
                        }
                        }
                    />
                );
            }
            if (domNode.name === 'a') {
                return (
                    <a href={domNode.attribs.href} target="_blank" rel="noreferrer" >
                        {domToReact(domNode.children, options)}
                    </a>
                );
            }
        }
    };

    return parse(props.content, options);
}
