import React from 'react';
import { FaShare } from 'react-icons/fa';
import {
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	EmailShareButton,
	FacebookIcon,
	TwitterIcon,
	WhatsappIcon,
	EmailIcon,
} from 'react-share';
const ShareButton = ({ property }: any) => {
	const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

	return (
		<>
			<h3 className="text-xl font-bold text-center pt-2">
				Share This Property
			</h3>
			<div className="flex gap-3 justify-center pb-5">
				<FacebookShareButton
					url={shareUrl}
					hashtag={`#${property.type}ForRent`}
				>
					<FacebookIcon size={40} round />
				</FacebookShareButton>

				<TwitterShareButton
					url={shareUrl}
					hashtags={[`#${property.type?.replace(/\s/g, '')}ForRent`]}
				>
					<TwitterIcon size={40} round />
				</TwitterShareButton>
				<WhatsappShareButton
					url={shareUrl}
					title={property.name}
					separator=":: "
				>
					<WhatsappIcon size={40} round />
				</WhatsappShareButton>
				<EmailShareButton
					url={shareUrl}
					body={`Check out this property listing: ${shareUrl}`}
				>
					<EmailIcon size={40} round />
				</EmailShareButton>
			</div>
		</>
	);
};

export default ShareButton;
