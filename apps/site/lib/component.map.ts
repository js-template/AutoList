import { BreadCrumbs, Banner, IconBox, AdsCard, Review, SearchFilter, BlogCard } from "@jstemplate/adslist";

const blockComponentMapping = {
   "header.breadcrumbs": {
      component: BreadCrumbs
   },
   "banner.banner-one": {
      component: Banner
   },
   "block.category-card": {
      component: IconBox
   },
   "block.ad-card": {
      component: AdsCard
   },
   "block.review-card": {
      component: Review
   },
   "forms.search-filter": {
      component: SearchFilter
   },
   "block.blog-card": {
      component: BlogCard
   }
} as any;

export default blockComponentMapping;
