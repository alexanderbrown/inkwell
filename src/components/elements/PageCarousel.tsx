import { Dispatch, SetStateAction, useState } from 'react';

import * as types from '@/types'
import Page from '@/components/elements/Page';
import Button from '@/components/buttons/ButtonComponent';
import ButtonGroup from '../buttons/ButtonGroup';


interface PageCarouselProps {
    study: types.Study
    responses: NodeJS.Dict<string | number>
    setResponses: Dispatch<SetStateAction<NodeJS.Dict<number | string>>>
    setInvalidResponses: Dispatch<SetStateAction<string[]>>
}

export default function PageCarousel({study, responses, setResponses, setInvalidResponses}: PageCarouselProps) {
    const [visiblePage, setVisiblePage] = useState<number>(0)
    
    return (
        <div className='border-2 border-slate-300 rounded px-4 pt-8 pb-4 m-4 min-w-[50rem]'>
            <Page page={study.pages[visiblePage]} 
                        responses={responses} 
                        setResponses={setResponses} 
                        setInvalidResponses={setInvalidResponses} />

            {study.pages.length > 1 && 
                <ButtonGroup justify='between'>
                    <Button color='slate' disabled={visiblePage<=0}
                        onClick={() => setVisiblePage(prev => prev-1)}>
                        Prev
                    </Button>
                    <Button color='slate' disabled={visiblePage>=(study.pages.length-1)} 
                            onClick={() => setVisiblePage(prev => prev+1)}>
                        Next
                    </Button>
                </ButtonGroup>
            }
        </div>
    )
}