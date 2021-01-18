import {compareCourses, Course} from '../model/course';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {CourseActions} from '../actions-types';


export interface ICoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>({
  sortComparer: compareCourses
});


export const initialState: ICoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export const coursesReducer = createReducer<ICoursesState>(
  initialState,
  on(CourseActions.allCoursesLoaded,
    (state: ICoursesState, action) => adapter.addAll(action.courses, {...state, allCoursesLoaded: true})
  ),

  on(CourseActions.courseUpdated,
    (state, action) => adapter.updateOne(action.update, state)
  )
);

export const {selectAll} = adapter.getSelectors();
