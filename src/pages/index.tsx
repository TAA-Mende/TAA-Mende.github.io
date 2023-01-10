import { ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { ReactNode } from 'react';

import { Button, Color, Feed } from '../components/tailwind-ui';
import { Mandats, useGetMandats } from '../hooks/useGetMandats';

export default function Home() {
  const mandats = useGetMandats();

  if (!mandats) {
    return null;
  }

  return (
    <div className="mx-auto flex h-screen max-w-2xl items-center">
      <Feed>
        {mandats.map((mandat) => (
          <Feed.Item
            key={`${mandat.org} - ${mandat.date}`}
            title={`${mandat.name} - ${mandat.date}`}
            description={<ItemDescription mandat={mandat} />}
            {...getPropsFromState(mandat.state)}
          />
        ))}
      </Feed>
    </div>
  );
}

interface ItemDescriptionProps {
  mandat: Mandats[number];
}

function ItemDescription(props: ItemDescriptionProps) {
  const { mandat } = props;

  return (
    <div className="flex flex-col gap-2">
      <span>{mandat.org}</span>
      {mandat.link && (
        <Link target="_blank" href={mandat.link}>
          <Button variant="white">Voir le mandat</Button>
        </Link>
      )}
    </div>
  );
}

function getPropsFromState(state: Mandats[number]['state']): {
  icon: ReactNode;
  iconBackgroundColor: Color | undefined;
} {
  if (state === 'Reportée') {
    return {
      iconBackgroundColor: 'warning',
      icon: <XCircleIcon />,
    };
  }

  return {
    iconBackgroundColor: 'success',
    icon: <ClockIcon />,
  };
}
