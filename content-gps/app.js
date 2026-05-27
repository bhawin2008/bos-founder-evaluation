(function () {
  'use strict';

  // ===== State =====
  const state = {
    currentStep: 0,
    totalSteps: 6,
    data: {
      primaryGoal: '',
      businessType: '',
      contentExperience: '',
      weeklyHours: 3,
      targetAudience: '',
      uniqueAngle: '',
      contentVoice: '',
      platforms: [],
      pillars: [
        { name: '', topics: '', ratio: 33 },
        { name: '', topics: '', ratio: 34 },
        { name: '', topics: '', ratio: 33 },
      ],
    },
  };

  // ===== Content Templates =====
  const CONTENT_IDEAS = {
    'thought-leadership': {
      templates: [
        'Unpopular opinion: {topic}',
        'The real reason most founders fail at {topic}',
        '3 lessons from {topic} that changed my approach',
        'What nobody tells you about {topic}',
        'I was wrong about {topic} — here\'s what I learned',
        'Framework: How to think about {topic}',
        'The {topic} playbook I wish I had 5 years ago',
        '{topic}: What separates good from great',
      ],
      formats: [
        { name: 'Long-form post', pct: 35 },
        { name: 'Thread / Carousel', pct: 25 },
        { name: 'Short take', pct: 20 },
        { name: 'Case study', pct: 20 },
      ],
    },
    'lead-generation': {
      templates: [
        'How we solved {topic} for our clients',
        'Before & after: {topic} transformation',
        '{topic} checklist every founder needs',
        'Free framework: Master {topic} in 30 days',
        'The {topic} mistake costing you clients',
        '5 signs you need to fix your {topic}',
        'Client spotlight: {topic} results',
        'Step-by-step: Our {topic} process',
      ],
      formats: [
        { name: 'How-to guide', pct: 30 },
        { name: 'Case study', pct: 30 },
        { name: 'Checklist / Template', pct: 20 },
        { name: 'Social proof post', pct: 20 },
      ],
    },
    'community-building': {
      templates: [
        'Question for founders: How do you handle {topic}?',
        'My honest take on {topic}',
        'Building in public: {topic} update',
        'Behind the scenes: {topic} decisions',
        'What I\'d do differently with {topic}',
        'Monthly recap: {topic} wins and lessons',
        'Founder journal: Struggling with {topic}',
        'Community poll: {topic} best practices',
      ],
      formats: [
        { name: 'Engagement post', pct: 30 },
        { name: 'Behind-the-scenes', pct: 25 },
        { name: 'Poll / Question', pct: 25 },
        { name: 'Story / Reflection', pct: 20 },
      ],
    },
    'hiring-brand': {
      templates: [
        'Why top engineers join {topic} companies',
        'Our culture in action: {topic}',
        'What a day looks like working on {topic}',
        'Hiring lesson: {topic} matters more than you think',
        'Team spotlight: How we approach {topic}',
        'The {topic} culture we\'re building',
        'We made a mistake with {topic} — here\'s what we changed',
        'Why we invest in {topic} for our team',
      ],
      formats: [
        { name: 'Team story', pct: 30 },
        { name: 'Culture post', pct: 25 },
        { name: 'Day-in-the-life', pct: 25 },
        { name: 'Hiring update', pct: 20 },
      ],
    },
  };

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const GOAL_LABELS = {
    'thought-leadership': 'Thought Leadership',
    'lead-generation': 'Lead Generation',
    'community-building': 'Community Building',
    'hiring-brand': 'Hiring & Brand',
  };

  const VOICE_LABELS = {
    direct: 'Direct & Bold',
    analytical: 'Analytical',
    storyteller: 'Storyteller',
    educator: 'Educator',
    contrarian: 'Contrarian',
    builder: 'Builder in Public',
  };

  const PLATFORM_LABELS = {
    linkedin: 'LinkedIn',
    twitter: 'X / Twitter',
    blog: 'Blog',
    newsletter: 'Newsletter',
    youtube: 'YouTube',
    podcast: 'Podcast',
  };

  const PILLAR_COLORS = ['var(--accent)', 'var(--green)', 'var(--purple)', 'var(--orange)', 'var(--yellow)'];

  // ===== Platform Playbook Data =====
  const PLATFORM_PLAYBOOK = {
    linkedin: {
      name: 'LinkedIn',
      stats: [
        { value: '3,000', label: 'Character limit' },
        { value: '2-5', label: 'Posts per week' },
        { value: 'Tue-Thu', label: 'Best days' },
        { value: '7-9 AM', label: 'Peak time' },
      ],
      formats: [
        { name: 'Text Post', desc: 'Personal stories, insights, and takes. Keep paragraphs to 1-2 lines for readability.' },
        { name: 'Carousel (PDF)', desc: 'Swipeable slides. Great for frameworks, step-by-steps, and data. 5-10 slides optimal.' },
        { name: 'Article', desc: 'Long-form thought leadership. Use for in-depth analysis or evergreen how-to content.' },
        { name: 'Poll', desc: 'Quick engagement boost. Ask opinion-based questions relevant to your audience.' },
        { name: 'Video', desc: 'Native video gets priority. Keep under 3 minutes. Subtitles are essential.' },
      ],
      hooks: [
        'I made a $X mistake so you don\'t have to.',
        'Hot take: [controversial opinion about industry]',
        'After [X years] in [field], here are [N] things I wish I knew:',
        'Stop doing [common practice]. Here\'s why:',
        'I went from [A] to [B] in [timeframe]. Here\'s the playbook:',
        'The difference between [junior] and [senior] [role]:',
        '[X]% of founders get this wrong about [topic].',
        'Unpopular opinion: [bold statement].',
      ],
      tips: [
        'First 2 lines are your hook — they appear before "see more". Make them count.',
        'Use line breaks liberally. Wall of text = scroll past.',
        'Post between 7-9 AM in your audience\'s timezone for maximum reach.',
        'Reply to every comment in the first 60 minutes. The algorithm rewards early engagement.',
        'Use 3-5 relevant hashtags. Place them at the end, not inline.',
        'Tag people only when genuinely relevant — spam tagging hurts your reach.',
        'Engage with 5-10 posts from your network before you publish. It primes the algorithm.',
        'End with a question or clear CTA to drive comments.',
      ],
      dos: [
        'Share personal stories and lessons learned',
        'Use white space and short paragraphs',
        'Engage authentically with comments',
        'Post consistently at the same times',
        'Mix formats: text, carousels, videos',
      ],
      donts: [
        'Write long paragraphs without line breaks',
        'Use clickbait without delivering value',
        'Tag people randomly for engagement',
        'Post and ghost — always engage after',
        'Copy-paste the same content repeatedly',
      ],
    },
    twitter: {
      name: 'X / Twitter',
      stats: [
        { value: '280', label: 'Chars per tweet' },
        { value: '3-7', label: 'Tweets per day' },
        { value: 'Mon-Fri', label: 'Best days' },
        { value: '8-10 AM', label: 'Peak time' },
      ],
      formats: [
        { name: 'Single Tweet', desc: 'Sharp takes, observations, or questions. Every word must earn its place.' },
        { name: 'Thread', desc: 'Deep-dive on a topic. First tweet is the hook. 5-15 tweets optimal.' },
        { name: 'Quote Tweet', desc: 'Add your take to trending conversations. Great for building authority.' },
        { name: 'Poll', desc: 'Drive engagement with 2-4 option polls. Keep them relevant and fun.' },
        { name: 'Image/Infographic', desc: 'Screenshots, charts, frameworks. Visual tweets get 35% more engagement.' },
      ],
      hooks: [
        '[Topic] is broken. Here\'s how to fix it:',
        'Thread: [N] lessons from [experience/achievement]',
        'Most people think [common belief]. The truth is:',
        'In [year], I [achievement]. Here\'s exactly how (thread):',
        'Controversial take: [statement]',
        'The [topic] cheat sheet you didn\'t know you needed:',
        'I analyzed [X] [things]. Here\'s what I found:',
        '[N]-second [topic] tip that will change your [outcome]:',
      ],
      tips: [
        'Your first tweet IS the content. If the hook fails, the thread dies.',
        'Use threads for long-form. Number each tweet (1/, 2/, etc.) for readability.',
        'Tweet at peak hours: 8-10 AM and 12-1 PM in your audience\'s timezone.',
        'Use 1-2 hashtags max. More than that looks spammy on X.',
        'Quote tweet > reply for visibility. Add genuine value when you do.',
        'Build in public — share wins, failures, and real numbers. Authenticity wins.',
        'End threads with a clear CTA: follow, bookmark, or retweet.',
        'Engage in replies of larger accounts in your niche to gain visibility.',
      ],
      dos: [
        'Be concise and punchy — every word counts',
        'Join trending conversations in your niche',
        'Use threads for detailed breakdowns',
        'Share real numbers and behind-the-scenes',
        'Bookmark and quote-tweet strategically',
      ],
      donts: [
        'Use more than 2 hashtags per tweet',
        'Thread without a strong hook tweet',
        'Ignore replies and mentions',
        'Post the same tweet format repeatedly',
        'Buy followers or use engagement pods',
      ],
    },
    blog: {
      name: 'Blog / Website',
      stats: [
        { value: '1.5-2.5K', label: 'Words for SEO' },
        { value: '1-2', label: 'Posts per week' },
        { value: 'Tue-Wed', label: 'Best publish days' },
        { value: '10 AM', label: 'Peak time' },
      ],
      formats: [
        { name: 'How-To Guide', desc: 'Step-by-step tutorials. Include code snippets, screenshots, or diagrams.' },
        { name: 'Listicle', desc: '"N best tools/tips/practices". Easy to scan and share. Great for SEO.' },
        { name: 'Case Study', desc: 'Before/after results. Show real data and the process behind the outcome.' },
        { name: 'Opinion Piece', desc: 'Take a stand on an industry topic. Great for backlinks and social shares.' },
        { name: 'Comparison Post', desc: '"X vs Y" posts. High search intent and great for capturing decision-stage readers.' },
      ],
      hooks: [
        'The Complete Guide to [Topic] in [Year]',
        '[N] [Topic] Mistakes That Are Costing You [Outcome]',
        'How We [Achieved Result] in [Timeframe]: A Step-by-Step Breakdown',
        '[Topic] vs [Topic]: Which Is Right for Your [Business Type]?',
        'Why [Common Approach] Is Wrong (And What to Do Instead)',
        'The [Topic] Playbook: Everything I Learned After [Experience]',
        '[N] [Topic] Tools Every [Role] Should Be Using in [Year]',
        'I [Did Something Bold] — Here\'s What Happened',
      ],
      tips: [
        'Target one primary keyword per post. Use it in the title, H1, first paragraph, and URL.',
        'Write a compelling meta description under 155 characters to boost click-through rates.',
        'Use H2 and H3 headings to structure content. Search engines and readers love clear hierarchy.',
        'Keep paragraphs to 2-3 sentences. Use bullet points for scannable sections.',
        'Add internal links to 2-3 related posts. This boosts SEO and reduces bounce rate.',
        'Include a clear CTA: email signup, related post, or product/service page.',
        'Optimize images with alt text and compress for fast loading.',
        'Update old posts every 6-12 months with fresh data and examples.',
      ],
      dos: [
        'Target specific long-tail keywords',
        'Use clear heading hierarchy (H1 > H2 > H3)',
        'Include visuals: diagrams, screenshots, charts',
        'Add a table of contents for 1,500+ word posts',
        'Promote each post across social channels',
      ],
      donts: [
        'Publish without a target keyword strategy',
        'Write walls of text without subheadings',
        'Forget meta descriptions and alt tags',
        'Neglect internal linking between posts',
        'Publish and never update older content',
      ],
    },
    newsletter: {
      name: 'Newsletter',
      stats: [
        { value: '6-10', label: 'Subject line words' },
        { value: '1-2x', label: 'Per week' },
        { value: 'Tue-Thu', label: 'Best send days' },
        { value: '9-10 AM', label: 'Peak open time' },
      ],
      formats: [
        { name: 'Personal Insight', desc: 'One core idea explored in depth with your unique perspective. 400-600 words.' },
        { name: 'Curated Roundup', desc: '5-7 links with your commentary. Save readers time while showing expertise.' },
        { name: 'Tactical Breakdown', desc: 'Step-by-step guide on a specific tactic. Include templates or frameworks.' },
        { name: 'Interview/Spotlight', desc: 'Feature an expert or customer. Cross-promotion builds both audiences.' },
        { name: 'Behind-the-Scenes', desc: 'Revenue updates, challenges, decisions. Builds trust and loyalty.' },
      ],
      hooks: [
        'The one thing I changed that [result]',
        'I was wrong about [topic] — here\'s what I learned',
        '[N] things I bookmarked this week (and why they matter)',
        'The [topic] framework I use every [timeframe]',
        'What nobody tells you about [common situation]',
        'A [role] asked me about [topic]. Here\'s what I said:',
        'This week I [did something]. Here are my takeaways.',
        '[Curiosity gap] — I\'ll explain inside.',
      ],
      tips: [
        'Subject line is 80% of the open. Use curiosity, specificity, or urgency.',
        'Keep your "from name" consistent — readers open based on who sent it.',
        'Send at the same day/time weekly. Consistency builds habit.',
        'Start with a hook paragraph. Don\'t waste the preview text.',
        'One CTA per email. More choices = fewer clicks.',
        'Ask readers to reply. Replies boost deliverability and build relationships.',
        'Segment your list based on engagement. Re-engage or prune inactive subscribers.',
        'A/B test subject lines with 10-20% of your list before sending to all.',
      ],
      dos: [
        'Use a personal, conversational tone',
        'Include one clear call-to-action',
        'Be consistent with send schedule',
        'Write subject lines that spark curiosity',
        'Ask readers to reply and engage',
      ],
      donts: [
        'Send without testing on mobile',
        'Overload with multiple CTAs',
        'Use generic subject lines',
        'Skip the preview text optimization',
        'Buy email lists or spam subscribers',
      ],
    },
    youtube: {
      name: 'YouTube',
      stats: [
        { value: '8-15', label: 'Optimal minutes' },
        { value: '1-2', label: 'Videos per week' },
        { value: 'Thu-Sat', label: 'Best publish days' },
        { value: '2-4 PM', label: 'Peak time' },
      ],
      formats: [
        { name: 'Tutorial', desc: 'Screen recordings or step-by-step guides. High search intent and long shelf life.' },
        { name: 'Talking Head', desc: 'Opinion, analysis, or story. Face-to-camera builds trust. Keep energy high.' },
        { name: 'Listicle Video', desc: '"Top N tools/tips" — easy to film, high watch time if value-packed.' },
        { name: 'Interview', desc: 'Bring in guests. Cross-promotion helps both channels grow.' },
        { name: 'Shorts', desc: '< 60 seconds vertical video. Great for discovery and new subscriber acquisition.' },
      ],
      hooks: [
        '[N] [Topic] Tips That Actually Work in [Year]',
        'How to [Achieve Result] Step by Step',
        'I Tried [Thing] for [Duration] — Here\'s What Happened',
        'Stop Making These [N] [Topic] Mistakes',
        '[Topic] Tutorial for [Audience]: Complete Guide',
        'Why Most [Role]s Fail at [Topic] (And How to Fix It)',
        'The [Tool/Framework] That Changed My [Outcome]',
        '[Topic] Explained in [N] Minutes',
      ],
      tips: [
        'The first 30 seconds decide if viewers stay. Open with a hook, not an intro.',
        'Title + thumbnail = 80% of click-through rate. Invest time in both.',
        'Use keywords in your title, description, and tags for YouTube SEO.',
        'Add timestamps in your description. It improves watch time and user experience.',
        'End screens and cards drive viewers to your next video. Always include them.',
        'Publish consistently. The algorithm rewards channels that upload on schedule.',
        'Encourage subscribers with a specific reason: "Subscribe for weekly [topic] videos."',
        'Repurpose YouTube content into blog posts, tweets, and newsletter material.',
      ],
      dos: [
        'Hook viewers in the first 30 seconds',
        'Invest in good audio (more than video quality)',
        'Use custom thumbnails with high contrast',
        'Add chapters/timestamps to descriptions',
        'Study your audience retention graphs',
      ],
      donts: [
        'Start with a long intro or animation',
        'Ignore thumbnail optimization',
        'Upload without a description or tags',
        'Publish inconsistently with no schedule',
        'Ask for likes/subs before delivering value',
      ],
    },
    podcast: {
      name: 'Podcast',
      stats: [
        { value: '20-45', label: 'Optimal minutes' },
        { value: '1', label: 'Episode per week' },
        { value: 'Mon-Wed', label: 'Best release days' },
        { value: '5-7 AM', label: 'Peak listen time' },
      ],
      formats: [
        { name: 'Solo Episode', desc: 'Share your expertise directly. Best for thought leadership and personal branding.' },
        { name: 'Interview', desc: 'Bring on guests. Cross-promotion and diverse perspectives grow your audience.' },
        { name: 'Co-Host Banter', desc: 'Regular co-host discussions. Great for personality-driven shows.' },
        { name: 'Case Study Deep-Dive', desc: 'Analyze a real company or decision in depth. Highly shareable and educational.' },
        { name: 'Q&A / Mailbag', desc: 'Answer listener questions. Builds community and keeps content listener-driven.' },
      ],
      hooks: [
        'The [Topic] Mistake That Cost Me [Amount/Result]',
        '[N] Things Every [Role] Should Know About [Topic]',
        'Inside [Company/Decision]: What Really Happened',
        'How [Guest] Built [Achievement] From Scratch',
        'The Honest Truth About [Topic] Nobody Talks About',
        'My [Timeframe] Review: What Worked, What Didn\'t',
        '[Topic] Masterclass: From Zero to [Result]',
        'Answering Your Top [N] Questions About [Topic]',
      ],
      tips: [
        'Invest in a good microphone. Audio quality is the #1 factor in listener retention.',
        'Create a consistent intro/outro. It builds brand recognition.',
        'Write detailed show notes with timestamps, links, and a summary.',
        'Submit to all major directories: Apple, Spotify, Google, and Amazon.',
        'Record 3-5 episodes before launching to build a buffer.',
        'Cut clips for social media. 30-60 second highlights drive discovery.',
        'Ask listeners to leave reviews — it\'s the #1 growth lever for podcasts.',
        'Repurpose transcripts into blog posts, Twitter threads, and LinkedIn posts.',
      ],
      dos: [
        'Invest in quality audio equipment',
        'Create detailed show notes with links',
        'Cut short clips for social promotion',
        'Be consistent with your release schedule',
        'Ask for reviews on Apple Podcasts',
      ],
      donts: [
        'Record in echoey or noisy environments',
        'Publish without show notes or descriptions',
        'Launch with only one episode',
        'Forget to promote on other channels',
        'Record without a rough outline or structure',
      ],
    },
  };

  // ===== Writing Frameworks =====
  const WRITING_FRAMEWORKS = [
    {
      name: 'AIDA',
      full: 'Attention, Interest, Desire, Action',
      steps: [
        'Attention — Grab them with a bold hook or surprising stat',
        'Interest — Explain the problem or opportunity they relate to',
        'Desire — Show the transformation or result they want',
        'Action — Tell them exactly what to do next',
      ],
    },
    {
      name: 'PAS',
      full: 'Problem, Agitate, Solution',
      steps: [
        'Problem — State the pain point your audience faces',
        'Agitate — Make the pain feel urgent and real',
        'Solution — Present your approach as the answer',
      ],
    },
    {
      name: 'BAB',
      full: 'Before, After, Bridge',
      steps: [
        'Before — Describe the current painful situation',
        'After — Paint a picture of the ideal outcome',
        'Bridge — Show how to get from before to after',
      ],
    },
    {
      name: 'SCQA',
      full: 'Situation, Complication, Question, Answer',
      steps: [
        'Situation — Set the context everyone agrees on',
        'Complication — Introduce the challenge or change',
        'Question — Frame the key question that needs answering',
        'Answer — Deliver your insight or solution',
      ],
    },
  ];

  // ===== Content Repurposing Map =====
  const REPURPOSE_MAP = [
    {
      source: 'Blog Post (1,500-2,000 words)',
      label: 'Original',
      outputs: [
        'LinkedIn post — pull out one key insight with a personal angle',
        'Twitter thread — break into 5-10 key takeaways',
        'Newsletter — summarize with a personal intro and CTA',
        'YouTube video — use the blog outline as your script',
        'Carousel — turn key points into visual slides',
        'Podcast segment — discuss the topic in more depth',
      ],
    },
    {
      source: 'Podcast Episode (30-45 min)',
      label: 'Original',
      outputs: [
        'Blog post — transcribe and edit into a written article',
        'Twitter thread — pull top 5 quotes or insights',
        'Short video clips — 30-60 second highlights for social',
        'Newsletter — summarize key takeaways and link to episode',
        'LinkedIn post — share one lesson learned from the conversation',
      ],
    },
    {
      source: 'Client/Customer Win',
      label: 'Original',
      outputs: [
        'Case study blog post — full before/after with data',
        'LinkedIn post — celebrate the win and tag the client',
        'Tweet — share one key metric or result',
        'Testimonial graphic — use a quote for visual content',
        'Newsletter feature — include in your weekly update',
      ],
    },
  ];

  // ===== Engagement Strategies =====
  const ENGAGEMENT_STRATEGIES = [
    {
      title: 'Pre-Post Warm-Up',
      items: [
        'Engage with 5-10 posts in your niche 30 min before publishing',
        'Leave thoughtful comments (not just "great post")',
        'This signals the algorithm you\'re active and primes your feed',
      ],
    },
    {
      title: 'The 60-Minute Rule',
      items: [
        'Stay active for 60 min after posting',
        'Reply to every comment within the first hour',
        'Ask follow-up questions to keep threads going',
      ],
    },
    {
      title: 'Collaboration Growth',
      items: [
        'Guest post on others\' newsletters or blogs',
        'Co-create content with complementary founders',
        'Feature customers and partners — they\'ll share it',
      ],
    },
    {
      title: 'Content Stacking',
      items: [
        'Repurpose one pillar piece into 5-7 social posts',
        'Cross-post adapted content across platforms',
        'Build a content library you can reference and reshare',
      ],
    },
  ];

  // ===== DOM References =====
  const progressFill = document.getElementById('progress-fill');
  const progressSteps = document.querySelectorAll('.progress-step');
  const stepPanels = document.querySelectorAll('.step-panel');
  const hoursRange = document.getElementById('weekly-hours');
  const hoursDisplay = document.getElementById('hours-display');
  const pillarsContainer = document.getElementById('pillars-container');
  const addPillarBtn = document.getElementById('add-pillar');
  const ratioTrack = document.getElementById('ratio-track');
  const ratioTotal = document.getElementById('ratio-total');

  // ===== Navigation =====
  function goToStep(step) {
    if (step < 0 || step >= state.totalSteps) return;

    // Collect data from current step before navigating
    collectStepData(state.currentStep);

    state.currentStep = step;

    // Update panels
    stepPanels.forEach((panel, i) => {
      panel.classList.toggle('active', i === step);
    });

    // Update progress steps
    progressSteps.forEach((el, i) => {
      el.classList.remove('active', 'completed');
      if (i === step) el.classList.add('active');
      else if (i < step) el.classList.add('completed');
    });

    // Update progress bar fill
    const pct = (step / (state.totalSteps - 1)) * 100;
    progressFill.style.width = pct + '%';

    // Run step-specific logic
    if (step === 3) generateRoute();
    if (step === 4) generateCompass();
    if (step === 5) generateCreatorStep();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ===== Data Collection =====
  function collectStepData(step) {
    switch (step) {
      case 0:
        state.data.primaryGoal = getRadioValue('primary-goal');
        state.data.businessType = document.getElementById('business-type').value;
        state.data.contentExperience = getRadioValue('content-experience');
        state.data.weeklyHours = parseInt(hoursRange.value);
        break;
      case 1:
        state.data.targetAudience = document.getElementById('target-audience').value.trim();
        state.data.uniqueAngle = document.getElementById('unique-angle').value.trim();
        state.data.contentVoice = getRadioValue('content-voice');
        state.data.platforms = getCheckedValues('platforms');
        break;
      case 2:
        collectPillarData();
        break;
    }
  }

  function getRadioValue(name) {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : '';
  }

  function getCheckedValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((el) => el.value);
  }

  function collectPillarData() {
    const cards = pillarsContainer.querySelectorAll('.pillar-card');
    state.data.pillars = Array.from(cards).map((card) => ({
      name: card.querySelector('.pillar-name').value.trim(),
      topics: card.querySelector('.pillar-topics').value.trim(),
      ratio: parseInt(card.querySelector('.pillar-ratio').value),
    }));
  }

  // ===== Pillar Management =====
  function addPillar() {
    if (state.data.pillars.length >= 5) return;

    const idx = pillarsContainer.children.length;
    const card = createPillarCard(idx, { name: '', topics: '', ratio: 20 });
    pillarsContainer.appendChild(card);
    bindPillarEvents(card);
    updatePillarRemoveButtons();
    updateRatioBar();
  }

  function createPillarCard(idx, data) {
    const card = document.createElement('div');
    card.className = 'pillar-card';
    card.dataset.pillar = idx;
    card.innerHTML = `
      <div class="pillar-header">
        <span class="pillar-number">Pillar ${idx + 1}</span>
        <button class="pillar-remove" aria-label="Remove pillar">&times;</button>
      </div>
      <div class="form-group">
        <label class="form-label">Pillar name</label>
        <input type="text" class="form-input pillar-name" placeholder="e.g., Topic area" value="${escapeHtml(data.name)}">
      </div>
      <div class="form-group">
        <label class="form-label">What you'll cover</label>
        <textarea class="form-textarea pillar-topics" rows="2" placeholder="e.g., Subtopics, themes">${escapeHtml(data.topics)}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Content ratio</label>
        <div class="range-wrapper">
          <input type="range" min="10" max="50" value="${data.ratio}" class="form-range pillar-ratio">
          <span class="range-value pillar-ratio-display">${data.ratio}%</span>
        </div>
      </div>
    `;
    return card;
  }

  function removePillar(card) {
    if (pillarsContainer.children.length <= 2) return;
    card.remove();
    renumberPillars();
    updatePillarRemoveButtons();
    updateRatioBar();
  }

  function renumberPillars() {
    const cards = pillarsContainer.querySelectorAll('.pillar-card');
    cards.forEach((card, i) => {
      card.dataset.pillar = i;
      card.querySelector('.pillar-number').textContent = `Pillar ${i + 1}`;
    });
  }

  function updatePillarRemoveButtons() {
    const cards = pillarsContainer.querySelectorAll('.pillar-card');
    cards.forEach((card) => {
      const btn = card.querySelector('.pillar-remove');
      btn.classList.toggle('hidden', cards.length <= 2);
    });
  }

  function updateRatioBar() {
    const cards = pillarsContainer.querySelectorAll('.pillar-card');
    let total = 0;
    const segments = [];

    cards.forEach((card, i) => {
      const val = parseInt(card.querySelector('.pillar-ratio').value);
      total += val;
      segments.push({ pct: val, color: PILLAR_COLORS[i] || PILLAR_COLORS[0] });
    });

    ratioTrack.innerHTML = segments
      .map((s) => `<div class="ratio-segment" style="width:${s.pct}%;background:${s.color}"></div>`)
      .join('');

    ratioTotal.textContent = `Total: ${total}%`;
    ratioTotal.className = 'ratio-total';
    if (total > 100) ratioTotal.classList.add('error');
    else if (total !== 100) ratioTotal.classList.add('warning');
  }

  function bindPillarEvents(card) {
    const ratio = card.querySelector('.pillar-ratio');
    const display = card.querySelector('.pillar-ratio-display');
    ratio.addEventListener('input', () => {
      display.textContent = ratio.value + '%';
      updateRatioBar();
    });

    const removeBtn = card.querySelector('.pillar-remove');
    removeBtn.addEventListener('click', () => removePillar(card));
  }

  // ===== Route Generation =====
  function generateRoute() {
    collectStepData(2);
    const d = state.data;
    const hours = d.weeklyHours;
    const platforms = d.platforms.length > 0 ? d.platforms : ['linkedin'];
    const goal = d.primaryGoal || 'thought-leadership';
    const templates = CONTENT_IDEAS[goal] || CONTENT_IDEAS['thought-leadership'];
    const pillars = d.pillars.filter((p) => p.name);

    // Calculate posts per week based on hours
    let postsPerWeek;
    if (hours <= 2) postsPerWeek = 2;
    else if (hours <= 4) postsPerWeek = 3;
    else if (hours <= 7) postsPerWeek = 4;
    else if (hours <= 10) postsPerWeek = 5;
    else postsPerWeek = 7;

    // Update summary
    document.getElementById('route-posts-week').textContent = postsPerWeek;
    document.getElementById('route-platforms').textContent = platforms.length;
    document.getElementById('route-hours').textContent = hours;

    // Generate calendar
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '';

    for (let week = 0; week < 4; week++) {
      const weekDiv = document.createElement('div');
      weekDiv.className = 'calendar-week';
      weekDiv.innerHTML = `<div class="calendar-week-header">Week ${week + 1}</div><div class="calendar-items"></div>`;

      const itemsContainer = weekDiv.querySelector('.calendar-items');

      for (let post = 0; post < postsPerWeek; post++) {
        const pillarIdx = pillars.length > 0 ? post % pillars.length : 0;
        const pillar = pillars[pillarIdx] || { name: 'General', topics: '' };
        const dayIdx = post % DAYS.length;
        const platform = platforms[post % platforms.length];
        const topicWords = pillar.topics ? pillar.topics.split(',')[0].trim() : pillar.name;
        const templateIdx = (week * postsPerWeek + post) % templates.templates.length;
        const title = templates.templates[templateIdx].replace('{topic}', topicWords || 'your niche');
        const format = templates.formats[post % templates.formats.length];

        const item = document.createElement('div');
        item.className = 'calendar-item';
        item.dataset.pillar = pillarIdx;
        item.innerHTML = `
          <span class="calendar-day">${DAYS[dayIdx]}</span>
          <span class="calendar-title">${escapeHtml(title)}</span>
          <span class="calendar-platform">${PLATFORM_LABELS[platform] || platform}</span>
          <span class="calendar-format">${escapeHtml(format.name)}</span>
        `;
        itemsContainer.appendChild(item);
      }

      calendarGrid.appendChild(weekDiv);
    }

    // Format mix
    const formatGrid = document.getElementById('format-grid');
    formatGrid.innerHTML = templates.formats
      .map(
        (f) => `
        <div class="format-card">
          <div class="format-bar"></div>
          <div>
            <div class="format-name">${f.name}</div>
            <div class="format-pct">${f.pct}% of content</div>
          </div>
        </div>
      `
      )
      .join('');
  }

  // ===== Compass (Results) =====
  function generateCompass() {
    collectStepData(state.currentStep - 1);
    const d = state.data;

    // Calculate readiness score
    let score = 0;
    let maxScore = 0;

    // Goal (15 points)
    maxScore += 15;
    if (d.primaryGoal) score += 15;

    // Business type (10 points)
    maxScore += 10;
    if (d.businessType) score += 10;

    // Experience (5 points)
    maxScore += 5;
    if (d.contentExperience) score += 5;

    // Hours (10 points)
    maxScore += 10;
    score += Math.min(10, Math.round((d.weeklyHours / 5) * 10));

    // Audience (15 points)
    maxScore += 15;
    if (d.targetAudience.length > 20) score += 15;
    else if (d.targetAudience.length > 5) score += 8;

    // Unique angle (15 points)
    maxScore += 15;
    if (d.uniqueAngle.length > 20) score += 15;
    else if (d.uniqueAngle.length > 5) score += 8;

    // Voice (10 points)
    maxScore += 10;
    if (d.contentVoice) score += 10;

    // Platforms (10 points)
    maxScore += 10;
    if (d.platforms.length >= 1) score += 5;
    if (d.platforms.length >= 2) score += 3;
    if (d.platforms.length >= 3) score += 2;

    // Pillars (10 points)
    maxScore += 10;
    const namedPillars = d.pillars.filter((p) => p.name.length > 0);
    score += Math.min(10, namedPillars.length * 3);

    const pct = Math.round((score / maxScore) * 100);

    // Update score ring
    const circle = document.getElementById('score-circle');
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (pct / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    document.getElementById('score-value').textContent = pct;

    const verdict = document.getElementById('score-verdict');
    if (pct >= 85) {
      verdict.textContent = 'Your content strategy is well-defined. You\'re ready to execute.';
      circle.style.stroke = 'var(--green)';
    } else if (pct >= 60) {
      verdict.textContent = 'Good foundation. Fill in the gaps to sharpen your strategy.';
      circle.style.stroke = 'var(--yellow)';
    } else {
      verdict.textContent = 'Your strategy needs more definition. Revisit the earlier steps.';
      circle.style.stroke = 'var(--red)';
    }

    // Compass cards
    document.getElementById('compass-goal').textContent = GOAL_LABELS[d.primaryGoal] || 'Not set';
    document.getElementById('compass-audience').textContent = d.targetAudience || 'Not defined';
    document.getElementById('compass-voice').textContent = VOICE_LABELS[d.contentVoice] || 'Not selected';
    document.getElementById('compass-platforms').textContent =
      d.platforms.map((p) => PLATFORM_LABELS[p] || p).join(', ') || 'None selected';

    // Pillars list
    const pillarsList = document.getElementById('compass-pillars-list');
    pillarsList.innerHTML = namedPillars
      .map(
        (p, i) => `
        <div class="compass-pillar-item">
          <span class="compass-pillar-color" style="background:${PILLAR_COLORS[i]}"></span>
          <span class="compass-pillar-name">${escapeHtml(p.name)}</span>
          <span class="compass-pillar-ratio">${p.ratio}%</span>
        </div>
      `
      )
      .join('');

    if (namedPillars.length === 0) {
      pillarsList.innerHTML = '<p style="color:var(--text-muted);font-size:14px;">No pillars defined yet.</p>';
    }

    // Action list
    generateActions(d, pct);
  }

  function generateActions(d, score) {
    const actions = [];

    if (!d.primaryGoal) {
      actions.push('Go back to Step 1 and select your primary content goal.');
    }
    if (!d.targetAudience || d.targetAudience.length < 10) {
      actions.push('Define your target audience in more detail. The more specific, the more your content resonates.');
    }
    if (!d.uniqueAngle || d.uniqueAngle.length < 10) {
      actions.push('Articulate your unique angle. What makes your perspective different from others in your space?');
    }
    if (d.platforms.length === 0) {
      actions.push('Select at least one platform to publish on. LinkedIn is the strongest for B2B founder content.');
    }
    if (d.pillars.filter((p) => p.name).length < 3) {
      actions.push('Define at least 3 content pillars to give your content variety and structure.');
    }
    if (d.weeklyHours < 3) {
      actions.push('Consider investing at least 3 hours per week. Consistency matters more than volume.');
    }

    // Always-applicable actions
    actions.push('Block time on your calendar for content creation — treat it like a meeting.');
    actions.push('Write your first 5 posts this week using the calendar as a guide.');
    if (score >= 60) {
      actions.push('Review and refine your strategy after 30 days of consistent posting.');
    }

    const actionList = document.getElementById('action-list');
    actionList.innerHTML = actions
      .map(
        (text, i) => `
        <div class="action-item">
          <span class="action-num">${i + 1}</span>
          <span class="action-text">${escapeHtml(text)}</span>
        </div>
      `
      )
      .join('');
  }

  // ===== Export =====
  function exportStrategy() {
    collectStepData(state.currentStep);
    const d = state.data;

    const exportData = {
      contentGPS: {
        exportDate: new Date().toISOString(),
        destination: {
          primaryGoal: GOAL_LABELS[d.primaryGoal] || d.primaryGoal,
          businessType: d.businessType,
          contentExperience: d.contentExperience,
          weeklyHours: d.weeklyHours,
        },
        position: {
          targetAudience: d.targetAudience,
          uniqueAngle: d.uniqueAngle,
          contentVoice: VOICE_LABELS[d.contentVoice] || d.contentVoice,
          platforms: d.platforms.map((p) => PLATFORM_LABELS[p] || p),
        },
        pillars: d.pillars
          .filter((p) => p.name)
          .map((p) => ({
            name: p.name,
            topics: p.topics,
            ratio: p.ratio + '%',
          })),
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content-gps-strategy.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ===== Content Creator & Platform Playbook =====
  function generateCreatorStep() {
    collectStepData(state.currentStep > 0 ? state.currentStep - 1 : 0);
    const d = state.data;
    const platforms = d.platforms.length > 0 ? d.platforms : ['linkedin'];
    const pillars = d.pillars.filter((p) => p.name);

    generatePlaybookTabs(platforms);
    initTransformer();
    generateStrategies(platforms);

    // Show first platform's playbook
    if (platforms.length > 0) {
      renderPlaybook(platforms[0]);
    }
  }

  // --- Platform Playbook ---
  function generatePlaybookTabs(platforms) {
    const container = document.getElementById('playbook-platform-tabs');
    container.innerHTML = platforms
      .map(
        (p, i) =>
          `<button class="playbook-platform-btn${i === 0 ? ' active' : ''}" data-platform="${p}">${PLATFORM_LABELS[p] || p}</button>`
      )
      .join('');

    container.querySelectorAll('.playbook-platform-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.playbook-platform-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        renderPlaybook(btn.dataset.platform);
      });
    });
  }

  function renderPlaybook(platform) {
    const data = PLATFORM_PLAYBOOK[platform];
    if (!data) return;

    const content = document.getElementById('playbook-content');
    content.innerHTML = `
      <!-- Quick Stats -->
      <div class="playbook-card">
        <div class="playbook-card-header">
          <span class="playbook-card-title">${escapeHtml(data.name)} — Quick Stats</span>
        </div>
        <div class="playbook-stat-grid">
          ${data.stats.map((s) => `
            <div class="playbook-stat">
              <div class="playbook-stat-value">${escapeHtml(s.value)}</div>
              <div class="playbook-stat-label">${escapeHtml(s.label)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Content Formats -->
      <div class="playbook-card">
        <div class="playbook-card-header">
          <span class="playbook-card-title">Content Formats That Work</span>
        </div>
        <div class="playbook-card-body">
          ${data.formats.map((f) => `
            <div class="playbook-item">
              <span class="playbook-item-bullet">></span>
              <span><strong>${escapeHtml(f.name)}</strong> — ${escapeHtml(f.desc)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Hook Formulas -->
      <div class="playbook-card">
        <div class="playbook-card-header">
          <span class="playbook-card-title">Proven Hook Formulas</span>
        </div>
        <div class="playbook-card-body">
          ${data.hooks.map((h) => `
            <div class="playbook-item">
              <span class="playbook-item-bullet">></span>
              <span>${escapeHtml(h)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Platform Tips -->
      <div class="playbook-card">
        <div class="playbook-card-header">
          <span class="playbook-card-title">Platform-Specific Tips</span>
        </div>
        <div class="playbook-card-body">
          ${data.tips.map((t) => `
            <div class="playbook-item">
              <span class="playbook-item-bullet">></span>
              <span>${escapeHtml(t)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Do's and Don'ts -->
      <div class="playbook-card">
        <div class="playbook-card-header">
          <span class="playbook-card-title">Do's & Don'ts</span>
        </div>
        <div class="playbook-dos-donts">
          <div class="playbook-do">
            <div class="playbook-do-title">Do</div>
            <ul class="playbook-do-list">
              ${data.dos.map((d) => `<li>${escapeHtml(d)}</li>`).join('')}
            </ul>
          </div>
          <div class="playbook-dont">
            <div class="playbook-dont-title">Don't</div>
            <ul class="playbook-dont-list">
              ${data.donts.map((d) => `<li>${escapeHtml(d)}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  // --- Content Transformer Engine ---
  function initTransformer() {
    const input = document.getElementById('transformer-input');
    const counter = document.getElementById('transformer-counter');
    if (input) {
      input.addEventListener('input', () => {
        counter.textContent = input.value.length + ' characters';
      });
    }
  }

  function transformContent() {
    const rawText = document.getElementById('transformer-input').value.trim();
    if (!rawText || rawText.length < 30) {
      alert('Please write at least a few sentences of rough content to transform.');
      return;
    }

    const analysis = analyzeContent(rawText);

    // Show sub-topics
    renderSubTopics(analysis.subTopics);

    // Generate refined version
    renderRefined(analysis);

    // Generate platform outputs
    renderLinkedIn(analysis);
    renderTwitterThread(analysis);
    renderBlogOutline(analysis);
    renderNewsletter(analysis);
    renderYouTubeScript(analysis);

    // Show all sections
    document.getElementById('transformer-subtopics').classList.remove('hidden');
    document.getElementById('transformer-refined').classList.remove('hidden');
    document.getElementById('transformer-outputs').classList.remove('hidden');

    // Scroll to results
    document.getElementById('transformer-subtopics').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function analyzeContent(text) {
    // Split into sentences
    const sentences = text
      .replace(/([.!?])\s+/g, '$1|||')
      .split('|||')
      .map((s) => s.trim())
      .filter((s) => s.length > 10);

    // Split into paragraphs
    const paragraphs = text
      .split(/\n\s*\n|\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 10);

    // Extract key sentences (with numbers/data, shorter punchy ones, first & last)
    const keySentences = [];
    const hookCandidates = [];

    sentences.forEach((s, i) => {
      if (/\d+%|\$\d|[0-9]+ (year|month|week|day|hour|people|team|engineer|client|customer)/i.test(s)) {
        keySentences.push(s);
      }
      if (s.length < 120 && s.length > 20) {
        hookCandidates.push(s);
      }
    });

    if (sentences.length > 0) keySentences.unshift(sentences[0]);
    if (sentences.length > 2) keySentences.push(sentences[sentences.length - 1]);

    // Deduplicate
    const uniqueKey = [...new Set(keySentences)];

    // Extract sub-topics from paragraph beginnings
    const subTopics = [];
    paragraphs.forEach((p) => {
      const firstSentence = p.split(/[.!?]/)[0].trim();
      if (firstSentence.length > 10 && firstSentence.length < 80) {
        // Clean up to make it a topic label
        let topic = firstSentence
          .replace(/^(I think|I believe|I've been|I was|I found|I realized|We|My|The|In my|After|So|But|And|Also|However)\s+/i, '')
          .replace(/\s+(is|are|was|were|that|which|because|when|where|how|why)\s+.*/i, '');
        topic = topic.charAt(0).toUpperCase() + topic.slice(1);
        if (topic.length > 5 && topic.length < 60 && !subTopics.includes(topic)) {
          subTopics.push(topic);
        }
      }
    });

    // If we got fewer than 3 sub-topics, extract from key noun phrases
    if (subTopics.length < 3) {
      const nounPhrases = text.match(/(?:the |a |an )?(?:[A-Z][a-z]+(?:\s+[a-z]+){0,2})/g) || [];
      nounPhrases.forEach((np) => {
        const cleaned = np.replace(/^(the |a |an )/i, '').trim();
        if (cleaned.length > 3 && cleaned.length < 40 && !subTopics.includes(cleaned)) {
          subTopics.push(cleaned);
        }
      });
    }

    // Generate a title
    const hookSentence = hookCandidates[0] || sentences[0] || text.slice(0, 100);
    const title = generateTitle(hookSentence, text);

    // Extract core takeaways (most impactful sentences)
    const takeaways = sentences
      .filter((s) => s.length > 30 && s.length < 200)
      .filter((s) => /important|key|lesson|learn|mistake|result|impact|change|realize|discover|secret|truth|actually/i.test(s) || /\d/.test(s))
      .slice(0, 5);

    if (takeaways.length < 3) {
      sentences.filter((s) => s.length > 40 && s.length < 180).slice(0, 5 - takeaways.length).forEach((s) => {
        if (!takeaways.includes(s)) takeaways.push(s);
      });
    }

    return {
      raw: text,
      sentences,
      paragraphs,
      keySentences: uniqueKey,
      hookCandidates,
      subTopics: subTopics.slice(0, 7),
      title,
      takeaways,
      hookSentence,
      wordCount: text.split(/\s+/).length,
    };
  }

  function generateTitle(hook, fullText) {
    // Try to create a compelling title from the hook
    let title = hook.replace(/[.!?,;:]+$/, '').trim();
    if (title.length > 70) {
      title = title.slice(0, 67) + '...';
    }
    // Make it more title-like
    if (!/^(Why|How|What|The|[0-9])/.test(title)) {
      if (/mistake|wrong|fail|bad/i.test(fullText)) {
        title = 'The Mistake Most People Make: ' + title.charAt(0).toLowerCase() + title.slice(1);
      } else if (/learn|lesson|realiz/i.test(fullText)) {
        title = 'What I Learned: ' + title.charAt(0).toLowerCase() + title.slice(1);
      }
    }
    return title.length > 80 ? title.slice(0, 77) + '...' : title;
  }

  function cleanSentence(s) {
    return s.replace(/^\s*(So,?|And,?|But,?|Also,?|Well,?|Like,?|Actually,?|Basically,?|I mean,?|You know,?)\s*/i, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function renderSubTopics(subTopics) {
    const container = document.getElementById('subtopic-chips');
    container.innerHTML = subTopics
      .map((t) => `<span class="subtopic-chip">${escapeHtml(t)}</span>`)
      .join('');
  }

  function renderRefined(a) {
    const container = document.getElementById('refined-content');
    const refined = a.sentences.map(cleanSentence).filter((s) => s.length > 15);

    // Group into proper paragraphs (3-4 sentences each)
    const paras = [];
    for (let i = 0; i < refined.length; i += 3) {
      paras.push(refined.slice(i, i + 3).join(' '));
    }

    container.textContent = paras.join('\n\n');
  }

  function renderLinkedIn(a) {
    const container = document.getElementById('linkedin-content');
    const charCount = document.getElementById('linkedin-chars');

    // LinkedIn format: Hook line, then spaced-out insights, then CTA
    const hook = cleanSentence(a.hookSentence).replace(/[.]+$/, '') + '.';
    const body = a.takeaways.slice(0, 4).map((t) => cleanSentence(t)).join('\n\n');
    const cta = '\n\nWhat\'s your experience with this? Drop your thoughts below.\n\n---\nFound this useful? Repost to share with your network.';

    const post = hook + '\n\n' + body + cta;
    container.textContent = post;
    charCount.textContent = post.length + ' / 3,000 chars';
  }

  function renderTwitterThread(a) {
    const container = document.getElementById('twitter-content');
    const charCount = document.getElementById('twitter-chars');

    const tweets = [];

    // Tweet 1: Hook
    const hook = cleanSentence(a.hookSentence).replace(/[.]+$/, '');
    tweets.push('1/ ' + (hook.length > 250 ? hook.slice(0, 247) + '...' : hook) + '\n\nA thread:');

    // Middle tweets: key takeaways
    a.takeaways.slice(0, 5).forEach((t, i) => {
      let tweet = cleanSentence(t);
      if (tweet.length > 270) tweet = tweet.slice(0, 267) + '...';
      tweets.push((i + 2) + '/ ' + tweet);
    });

    // Final tweet: CTA
    tweets.push((tweets.length + 1) + '/ That\'s a wrap.\n\nIf this resonated:\n- Like this thread\n- Repost the first tweet\n- Follow for more insights like this');

    const thread = tweets.join('\n\n---\n\n');
    container.textContent = thread;
    charCount.textContent = tweets.length + ' tweets';
  }

  function renderBlogOutline(a) {
    const container = document.getElementById('blog-content');

    let outline = '# ' + a.title + '\n\n';
    outline += '## Introduction\n';
    outline += cleanSentence(a.sentences[0] || '') + ' ';
    if (a.sentences[1]) outline += cleanSentence(a.sentences[1]);
    outline += '\n\nIn this post, I\'ll break down the key lessons and actionable takeaways.\n\n';

    // Generate sections from sub-topics
    a.subTopics.slice(0, 5).forEach((topic, i) => {
      outline += '## ' + (i + 1) + '. ' + topic + '\n';
      // Find sentences related to this topic
      const related = a.sentences.filter((s) =>
        s.toLowerCase().includes(topic.toLowerCase().split(' ')[0])
      );
      if (related.length > 0) {
        outline += cleanSentence(related[0]) + '\n';
        if (related[1]) outline += '\n' + cleanSentence(related[1]) + '\n';
      } else if (a.takeaways[i]) {
        outline += cleanSentence(a.takeaways[i]) + '\n';
      }
      outline += '\n';
    });

    outline += '## Key Takeaways\n';
    a.takeaways.slice(0, 4).forEach((t) => {
      outline += '- ' + cleanSentence(t) + '\n';
    });

    outline += '\n## Conclusion\n';
    outline += cleanSentence(a.sentences[a.sentences.length - 1] || a.hookSentence);
    outline += '\n\nWhat would you add to this list? Share your thoughts in the comments.';

    container.textContent = outline;
  }

  function renderNewsletter(a) {
    const container = document.getElementById('newsletter-content');

    let nl = 'Subject: ' + a.title + '\n';
    nl += 'Preview: ' + cleanSentence(a.hookSentence).slice(0, 90) + '...\n\n';
    nl += '---\n\n';
    nl += 'Hey there,\n\n';
    nl += cleanSentence(a.hookSentence) + '\n\n';
    nl += 'I\'ve been thinking about this a lot lately, and I wanted to share what I\'ve learned.\n\n';

    // Key Points
    nl += 'Here are the key takeaways:\n\n';
    a.takeaways.slice(0, 4).forEach((t, i) => {
      nl += (i + 1) + '. ' + cleanSentence(t) + '\n\n';
    });

    // Wrap up
    nl += '---\n\n';
    nl += 'The bottom line? ';
    nl += cleanSentence(a.sentences[a.sentences.length - 1] || a.takeaways[0] || a.hookSentence) + '\n\n';
    nl += 'Hit reply and let me know — what\'s been your experience with this?\n\n';
    nl += 'Talk soon,\n[Your name]';

    container.textContent = nl;
  }

  function renderYouTubeScript(a) {
    const container = document.getElementById('youtube-content');

    let script = '=== VIDEO TITLE ===\n';
    script += a.title + '\n\n';

    script += '=== HOOK (0:00 - 0:30) ===\n';
    script += '"' + cleanSentence(a.hookSentence) + '"\n';
    script += 'In this video, I\'m going to break down exactly what I\'ve learned.\n\n';

    script += '=== INTRO (0:30 - 1:00) ===\n';
    script += 'Before we dive in, if you find this valuable, hit subscribe and the bell icon.\n';
    script += 'This is something most people get wrong, and I want to make sure you don\'t.\n\n';

    script += '=== MAIN CONTENT ===\n\n';
    a.subTopics.slice(0, 5).forEach((topic, i) => {
      const timestamp = (i + 1) + ':00';
      script += '--- Point ' + (i + 1) + ': ' + topic + ' (' + timestamp + ') ---\n';
      if (a.takeaways[i]) {
        script += cleanSentence(a.takeaways[i]) + '\n';
      }
      const related = a.sentences.filter((s) =>
        s.toLowerCase().includes(topic.toLowerCase().split(' ')[0])
      );
      if (related.length > 1) {
        script += cleanSentence(related[1] || related[0]) + '\n';
      }
      script += '\n';
    });

    script += '=== RECAP & CTA ===\n';
    script += 'So to recap:\n';
    a.takeaways.slice(0, 4).forEach((t, i) => {
      script += (i + 1) + '. ' + cleanSentence(t).slice(0, 100) + '\n';
    });
    script += '\nIf this was helpful, drop a comment with your biggest takeaway.\n';
    script += 'Subscribe for more videos like this, and I\'ll see you in the next one.\n\n';

    script += '=== DESCRIPTION ===\n';
    script += a.title + '\n\n';
    script += 'In this video:\n';
    a.subTopics.slice(0, 5).forEach((topic, i) => {
      script += '0' + (i + 1) + ':00 - ' + topic + '\n';
    });
    script += '\n#' + a.subTopics.slice(0, 3).map((t) => t.replace(/\s+/g, '')).join(' #');

    container.textContent = script;
  }

  // --- Growth Strategies ---
  function generateStrategies(platforms) {
    // Writing Frameworks
    const frameworkGrid = document.getElementById('framework-grid');
    frameworkGrid.innerHTML = WRITING_FRAMEWORKS
      .map(
        (f) => `
        <div class="framework-card">
          <div class="framework-name">${escapeHtml(f.name)}</div>
          <div class="framework-full">${escapeHtml(f.full)}</div>
          <div class="framework-steps">
            ${f.steps.map((s, i) => `
              <div class="framework-step">
                <span class="framework-step-num">${i + 1}</span>
                <span>${escapeHtml(s)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `
      )
      .join('');

    // Repurpose Flow
    const repurposeFlow = document.getElementById('repurpose-flow');
    repurposeFlow.innerHTML = REPURPOSE_MAP
      .map(
        (r) => `
        <div class="repurpose-card">
          <div class="repurpose-source">
            <span>${escapeHtml(r.source)}</span>
            <span class="repurpose-source-label">${escapeHtml(r.label)}</span>
          </div>
          <div class="repurpose-outputs">
            ${r.outputs.map((o) => `
              <div class="repurpose-output">
                <span class="repurpose-arrow">-></span>
                <span>${escapeHtml(o)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `
      )
      .join('');

    // Engagement Grid
    const engagementGrid = document.getElementById('engagement-grid');
    engagementGrid.innerHTML = ENGAGEMENT_STRATEGIES
      .map(
        (e) => `
        <div class="engagement-card">
          <div class="engagement-card-title">${escapeHtml(e.title)}</div>
          <ul class="engagement-list">
            ${e.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>
      `
      )
      .join('');

    // Schedule Grid
    const scheduleGrid = document.getElementById('schedule-grid');
    const hours = state.data.weeklyHours || 3;
    scheduleGrid.innerHTML = platforms
      .map((p) => {
        const data = PLATFORM_PLAYBOOK[p];
        if (!data) return '';
        const stats = data.stats;
        return `
          <div class="schedule-card">
            <div class="schedule-platform">${escapeHtml(data.name)}</div>
            <div class="schedule-details">
              <div class="schedule-detail">
                <span class="schedule-detail-label">Frequency</span>
                <span class="schedule-detail-value">${escapeHtml(stats[1].value)} ${escapeHtml(stats[1].label.toLowerCase())}</span>
              </div>
              <div class="schedule-detail">
                <span class="schedule-detail-label">Best Days</span>
                <span class="schedule-detail-value">${escapeHtml(stats[2].value)}</span>
              </div>
              <div class="schedule-detail">
                <span class="schedule-detail-label">Peak Time</span>
                <span class="schedule-detail-value">${escapeHtml(stats[3].value)}</span>
              </div>
              <div class="schedule-detail">
                <span class="schedule-detail-label">Your Budget</span>
                <span class="schedule-detail-value">${Math.round(hours / platforms.length)} hrs/week</span>
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  // ===== Utilities =====
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ===== Event Binding =====
  function init() {
    // Next / Prev buttons
    document.querySelectorAll('.btn-next').forEach((btn) => {
      btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.next)));
    });

    document.querySelectorAll('.btn-prev').forEach((btn) => {
      btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.prev)));
    });

    // Progress step clicks
    progressSteps.forEach((step) => {
      step.addEventListener('click', () => goToStep(parseInt(step.dataset.step)));
    });

    // Hours range
    hoursRange.addEventListener('input', () => {
      hoursDisplay.textContent = hoursRange.value + (hoursRange.value === '1' ? ' hour' : ' hours');
    });

    // Pillar management
    addPillarBtn.addEventListener('click', addPillar);

    // Bind existing pillar cards
    pillarsContainer.querySelectorAll('.pillar-card').forEach(bindPillarEvents);
    updatePillarRemoveButtons();
    updateRatioBar();

    // Regenerate calendar
    document.getElementById('regenerate-calendar').addEventListener('click', generateRoute);

    // Export
    document.getElementById('export-strategy').addEventListener('click', exportStrategy);

    // Start over
    document.getElementById('start-over').addEventListener('click', () => {
      if (confirm('Start over? This will clear all your entries.')) {
        location.reload();
      }
    });

    // Creator tab switching
    document.querySelectorAll('.creator-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.creator-tab').forEach((t) => t.classList.remove('active'));
        document.querySelectorAll('.creator-tab-panel').forEach((p) => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.getElementById('tab-' + tab.dataset.creatorTab);
        if (panel) panel.classList.add('active');
      });
    });

    // Transform button
    const transformBtn = document.getElementById('transform-btn');
    if (transformBtn) {
      transformBtn.addEventListener('click', transformContent);
    }

    // Clear transformer
    const clearTransformerBtn = document.getElementById('clear-transformer');
    if (clearTransformerBtn) {
      clearTransformerBtn.addEventListener('click', () => {
        document.getElementById('transformer-input').value = '';
        document.getElementById('transformer-counter').textContent = '0 characters';
        document.getElementById('transformer-subtopics').classList.add('hidden');
        document.getElementById('transformer-refined').classList.add('hidden');
        document.getElementById('transformer-outputs').classList.add('hidden');
      });
    }

    // Copy buttons for all output cards
    document.querySelectorAll('.output-copy-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const target = document.getElementById(targetId);
        if (target && target.textContent) {
          navigator.clipboard.writeText(target.textContent).then(() => {
            const orig = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = orig; }, 2000);
          });
        }
      });
    });

    // Limit platform checkboxes to 3
    document.querySelectorAll('input[name="platforms"]').forEach((cb) => {
      cb.addEventListener('change', () => {
        const checked = document.querySelectorAll('input[name="platforms"]:checked');
        if (checked.length > 3) {
          cb.checked = false;
        }
      });
    });

    // Initialize progress
    goToStep(0);
  }

  // Start
  document.addEventListener('DOMContentLoaded', init);
})();
