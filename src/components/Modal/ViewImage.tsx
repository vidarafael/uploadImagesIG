import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  // const sizes = ["xs", "sm", "md", "lg", "xl", "full"];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bgColor="transparent"
        maxWidth="900px"
        width="auto"
        maxHeight="600px"
        height="auto"
      >
        <ModalBody padding="0">
          <Image
            src={imgUrl}
            alt="imagem"
            objectFit="cover"
            maxWidth="900px"
            maxH="600px"
            width="auto"
            height="auto"
          />
        </ModalBody>
        <ModalFooter bgColor="pGray.800" borderBottomRadius="md">
          <Link mr="auto" href={imgUrl} isExternal>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
