import styled from '@emotion/styled'
import PageTitle from '@/components/elements/PageTitle.tsx'
import { ContentContainer } from '@/assets/styles/global.ts'
import Button from '@/components/elements/Button.tsx'
import { useNavigate } from 'react-router-dom'

const DarkWebDetailPage = () => {
  const navigate = useNavigate()
  return (
    <ContentContainer>
      <PageTitle
        text={'다크웹 데이터 상세 조회'}
        children={
          <Button
            type={'primary'}
            onClick={() => navigate('/issue/tracking/detail')}
            text={'이슈 대응'}
          />
        }
      />
      <Table>
        <tbody>
          <tr>
            <LabelTd>제목</LabelTd>
            <Td colSpan={3}>Software News • The Register</Td>
            <LabelTd>카테고리</LabelTd>
            <Td>url</Td>
          </tr>
          <tr>
            <LabelTd>작성자</LabelTd>
            <Td colSpan={3}>-</Td>
            <LabelTd>작성시간</LabelTd>
            <Td>2024.08.15 12:13</Td>
          </tr>
          <tr>
            <LabelTd>해킹여부</LabelTd>
            <Td>해킹</Td>
            <LabelTd>판단 키워드</LabelTd>
            <Td>sell</Td>
            <LabelTd>수집 키워드</LabelTd>
            <Td>nate/kr</Td>
          </tr>
          <tr>
            <LabelTd>URL</LabelTd>
            <Td colSpan={5}>https://gumgum.com</Td>
          </tr>
          <tr>
            <LabelTd>내용</LabelTd>
            <Td colSpan={5}>
              {
                'Step into the Mindset Era with the GumGum Platform™ & the New Mindset Graph Learn MoreStep into the Mindset Era with the GumGum Platform™ & the New Mindset Graph Learn MoreSolutionsThe GumGum Platform™ContextualGumGums Contextual Intelligence PlatformAttentionMaximize Ad Relevance & Performance with Attention MetricsCreativeGumGums Full Product Suite and Contextual OfferingsThe Mindset Graph™Find Relevant, Untapped Audiences for Your BrandBY CUSTOMER TYPEAdvertisersResources and Support to Amplify Media StrategiesPublishersResources and Support to Unlock Targetable InventoryPlatforms & PartnersMedia Partnerships and Product IntegrationsBy Solution TypeConnected TV Advertising / In-VideoGrow Your Audience With Connected TV (CTV) AdvertisingGumGums ExchangeEnriched with Brand Safety in Every ImpressionIn-Game AdvertisingExpand Your Reach With In-Game AdvertisingXandr Will Be the First Major DSP To Offer Verity™, GumGum’s Accredited Contextual Targeting and Brand Safety TechnologyLearn More  →Creative GalleryAdvertisers GalleryA Comprehensive Guide to GumGums Ad Units for AdvertisersPublishers GalleryA Comprehensive Guide to GumGums Ad Units for PublishersNew Ad Unit: Desktop Skins - This unit expands across the screen and seamlessly integrates with the content.Learn More  →InsightsGUMGUM libraryGumGum BlogArticles, Culture and Events from GumGumResearch & GuidesThird-party Testing, Analysis and Studies to Prove the Power of Contextual AdvertisingCase StudiesClient Campaign Recaps and Success StoriesWebinarsAgency Conferences, Leadership Panels and Talk SeriesContextual PioneersGumGums Client Video Series and InterviewsView More →GUMGUM communityTech BlogAll the Latest from GumGums Tech TeamCulture BlogAll the Latest about Life at GumGumThe VOICELorem ipsum dolor sit amet, consectetur.AboutAbout UsThe Vision, Mission and History of GumGum.Mission & ValuesLorem ipsum dolor sit amet, consectetur adipiscing elitLeadershipMeet GumGums Executive TeamCareers were hiringLead the industry with us. Join our global team.NewsroomGumGum in the News and MediaEngineering @ GumGumExplore the Engineering Teams Programs, News and ResearchCulture @ GumGumLorem ipsum dolor sit amet, consectetur adipiscing elitDiversity, Equity, Inclusion and BelongingGumGums Work to Create a Culture of InclusivityWere Hiring!  Apply Here to Work with Us - Were Hiring for Remote & In-Person Roles Based in Multiple Global RegionsApply Now →ContactGet  DemoLoginLoginENDEFRESDAJPJAWe Create the Perfect Match Between Brands and ConsumersOur AI-driven ad tech delivers better experiences in every digital environment, accurately and at scale, without using cookies or personal data.Advertise with UsMonetize with UsAdvertise with UsMonetize with UsThe GumGum Platform™ Unlocks the Value of Effective AdvertisingContextualAttentionCreativeCreate the match to the user’s relevant moment.Unlock the Power of ContextualMeasure attention and optimize campaigns in real time.Drive Better Outcomes with AttentionDynamic ad creatives that captivate attention.Explore Creative UnitsWe Drive Value for our PartnersBrandsPublishersDSPsMeet People In the Right MomentDont waste time delivering an ad based on past digital footprints. Meet people in their current moment by delivering the right ad, in the right environment, when they want it most.Advertise with UsMonetize Audiences In The Right Frame of MindGumGum empowers publishers to unlock revenue potential with its accredited contextual technology and data.Monetize with UsLead The Industry With UsAt GumGum, we are thoughtful, agile and gritty. We work hard for our clients and passionately support our communities and the world around us.Join UsReady to Succeed in aCookieless World?Fill out the form & we will be in touch soon!Required Fields *First Name *Last Name *Work Email *Title *Company Name *Country *United StatesUnited KingdomCanadaGermanyNetherlandsJapanAustraliaMexicoBelgiumNorwaySwedenDenmarkFinland___________AfghanistanAkrotiriAlbaniaAlgeriaAmerican SamoaAndorraAngolaAnguillaAntarcticaAntigua and BarbudaArgentinaArmeniaArubaAshmore and Cartier IslandsAustriaAzerbaijanBahamasBahrainBangladeshBarbadosBassas da IndiaBelarusBelizeBeninBermudaBhutanBoliviaBosnia and HerzegovinaBotswanaBouvet IslandBrazilBritish Indian Ocean TerritoryBritish Virgin IslandsBruneiBulgariaBurkina FasoBurmaBurundiCambodiaCameroonCape VerdeCayman IslandsCentral African RepublicChadChileChinaChristmas IslandClipperton IslandCocos (Keeling) IslandsColombiaComorosCongoDemocratic Republic of the CongoRepublic of the Cook IslandsCoral Sea IslandsCosta RicaCote dIvoireCroatiaCubaCyprusCzech RepublicDhekeliaDjiboutiDominicaDominican RepublicEcuadorEgyptEl SalvadorEquatorial GuineaEritreaEstoniaEthiopiaEuropa IslandFalkland Islands (Islas Malvinas)Faroe IslandsFijiFranceFrench GuianaFrench PolynesiaFrench Southern and Antarctic LandsGabonGambiaGaza StripGeorgiaGhanaGibraltarGlorioso IslandsGreeceGreenlandGrenadaGuadeloupeGuamGuatemalaGuernseyGuineaGuinea-BissauGuyanaHaitiHeard Island and McDonald IslandsHoly See (Vatican City)HondurasHong KongHungaryIcelandIndiaIndonesiaIranIraqIrelandIsle of ManIsraelItalyJamaicaJan MayenJerseyJordanJuan de Nova IslandKazakhstanKenyaKiribatiKorea, NorthKorea, SouthKuwaitKyrgyzstanLaosLatviaLebanonLesothoLiberiaLibyaLiechtensteinLithuaniaLuxembourgMacauMacedoniaMadagascarMalawiMalaysiaMaldivesMaliMaltaMarshall IslandsMartiniqueMauritaniaMauritiusMayotteMicronesiaMoldovaMonacoMongoliaMontenegroMontserratMoroccoMozambiqueNamibiaNauruNavassa IslandNepalNetherlands AntillesNew CaledoniaNew ZealandNicaraguaNigerNigeriaNiueNorfolk IslandNorthern Mariana IslandsOmanPakistanPalauPanamaPapua New GuineaParacel IslandsParaguayPeruPhilippinesPitcairn IslandsPolandPortugalPuerto RicoQatarReunionRomaniaRussiaRwandaSaint HelenaSaint Kitts and NevisSaint LuciaSaint Pierre and MiquelonSaint Vincent and the GrenadinesSamoaSan MarinoSao Tome and PrincipeSaudi ArabiaSenegalSerbiaSeychellesSierra LeoneSingaporeSlovakiaSloveniaSolomon IslandsSomaliaSouth AfricaSouth Georgia and the South Sandwich IslandsSpainSpratly IslandsSri LankaSudanSurinameSvalbardSwazilandSwitzerlandSyriaTaiwanTajikistanTanzaniaThailandTimor-LesteTogoTokelauTongaTrinidad and TobagoTromelin IslandTunisiaTurkeyTurkmenistanTurks and Caicos IslandsTuvaluUgandaUkraineUnited Arab EmiratesUruguayUzbekistanVanuatuVenezuelaVietnamVirgin IslandsWake IslandWallis and FutunaWest BankWestern SaharaYemenZambiaZimbabweCompany Type *BrandAgencyPublisherDSP or Trading DeskReporter / AnalystTechnology PartnerStudent / Job SeekerInvestorRights HolderOtherHow did you hear about us?Expected Ad Spend20-50k50-100k> 100k‍♂️CommentsI’d like to receive occasional GumGum marketing communications to learn more about contextual advertisinginsertpageurlYour data will be processed according to our Privacy Policy.Thank you!A GumGum representative will be in touch soon.Something went wrong while submitting the form.Gain Insights & ExpertiseArticles, Research and Product News to Drive Your BusinessContextualTop Holiday Trends of 2024: What Brands Need to KnowHere’s a look at the top holiday shopping predictions for 2024 and how brands can leverage these insights to create successful campaigns.ByGumGum TeamOct 8, 2024Mindset Step into the Mindset Era with the GumGum Platform™We’re thrilled to introduce the new GumGum Platform™ that uses contextual technology and AI to deliver experiences that genuinely resonate with audiences and add value to their everyday experiences as consumers.ByKayla SmallsOct 3, 2024ContextualOracle Advertising is Shutting Down: Here’s How You Can Move ForwardOracles decision to exit the advertising business marks a significant shift in the digital advertising landscape. In this blog post, we will discuss the implications of this exit for advertisers and how you can move forward with your marketing campaigns.ByGumGum TeamAug 14, 2024Subscribe to receive the latest on Contextual Advertisinghttps://gumgum.com/Thank you! Youre signed up.Oops! Something went wrong while submitting the form.SolutionsContextualAttentionCreativeAdvertisersPublishersInsightsGumGum BlogResearch & GuidesCase StudiesNewsroomTech BlogAbout UsLeadershipCareersThe VOICEGumGum Gives BackEngineeringTerms & PoliciesPrivacy PolicyCookies PolicyOpt-OutProhibited Content Policy for Buyers and SellersAcceptable UseDMCAPublisher Terms of ServiceVendor DPAClients DPAArchivesArchive: Privacy PolicyArchive: Our TermsArchive: Cookies PolicyArchive: Data Processor AgreementSecurityJustPremium Policy & TermsJustPremium: Privacy PolicyJustPremium: Publisher terms (US)JustPremium: Publisher Terms (EU)JustPremium: Advertiser Terms (US)JustPremium: Advertiser Terms (EU)JustPremium: Creative Services TermsJustPremium: Quality ControlJustPremium: Holiday Game TermsJapan Policies & TermsJapan: Terms of ServiceJapan: Privacy PolicyArchive: Privacy PolicyArchive: Buyer PolicyPublisher Services AgreementArchive: Publisher Services AgreementSecurity PackagesHelpful LinksContactLog InCertifications© 2024 GumGum, Inc. All rights reserved. We use cookies and other data collection technologies to provide the best experience for our customers. Exercise your rightsDo not sellENJAFRESDAENJAFRESDA'
              }
            </Td>
          </tr>
        </tbody>
      </Table>
    </ContentContainer>
  )
}

export default DarkWebDetailPage

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  ${({ theme }) => theme.typography.body2};
  table-layout: fixed;
`
const Td = styled.td`
  padding: 8px 12px;
  border-bottom: 1px solid #d9d9d9;
  //width: 75%;
`
const LabelTd = styled(Td)`
  //width: 25%;
  background-color: #f6f6f6;
`
