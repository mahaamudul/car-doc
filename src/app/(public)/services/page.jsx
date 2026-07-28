import Service from '@/components/HomePage/Service';
import Heading from '@/components/Shared/Heading';
import React from 'react';

const page = () => {
    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 mt-10">
        <Heading title="See all Services" currentRoute="Services" />
        <Service/>
      </div>
        </div>
    );
};

export default page;