import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

export class AmplifyProductionStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    /*
	REWRITE					Rewrite (200).
	PERMANENT_REDIRECT	Permanent redirect (301).
	TEMPORARY_REDIRECT	Temporary redirect (302).
	NOT_FOUND				Not found (404).
	NOT_FOUND_REWRITE		Not found rewrite (404).
*/

    const main_paths = [
      {
        source: 'https://jira.alliancegenome.org',
        target: 'https://agr-jira.atlassian.net',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: 'https://alliancegenome.org',
        target: 'https://www.alliancegenome.org',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },

      {
        source: '/api/<*>',
        target: 'https://prod-alb.alliancegenome.org/api/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },

      {
        source: '/jbrowse2',
        target: 'https://www.alliancegenome.org/jbrowse2/',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/jbrowse2/',
        target: 'https://main.dgaayxgqoarxf.amplifyapp.com/',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/jbrowse2/<*>',
        target: 'https://main.dgaayxgqoarxf.amplifyapp.com/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/jbrowsedata/XenBaseXTJBrowse/<*>',
        target: 'https://jbrowse.xenbase.org/XenJBrowse/data/xt10_0/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/jbrowsedata/XenBaseXLJBrowse/<*>',
        target: 'https://jbrowse.xenbase.org/XenJBrowse/data/xl10_1/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/jbrowsedata/XenBaseData/<*>',
        target: 'https://jbrowse.xenbase.org/XenJBrowse/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/jbrowsedata/RGDJBrowse/<*>',
        target: 'https://rgd.mcw.edu/jbrowse2/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/jbrowsedata/XenBaseBigFtp/<*>',
        target: 'https://bigftp.xenbase.org/pub/xenbase/genomics/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/jbrowse/worms/protein',
        target: 'https://www.alliancegenome.org/jbrowse/worms/protein/',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/jbrowse/worms/protein/',
        target: 'https://main.djgvd7iswt7yy.amplifyapp.com/',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/jbrowse/worms/protein/<*>',
        target: 'https://main.djgvd7iswt7yy.amplifyapp.com/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/jbrowse/worms/jbrowse-simple',
        target: 'https://www.alliancegenome.org/jbrowse/worms/jbrowse-simple/',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/jbrowse/worms/jbrowse-simple/',
        target: 'https://main.d341oo3yism9gt.amplifyapp.com/jbrowse-simple/',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/jbrowse/worms/jbrowse-simple/<*>',
        target: 'https://main.d341oo3yism9gt.amplifyapp.com/jbrowse-simple/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/jbrowse/worms/jbrowse',
        target: 'https://www.alliancegenome.org/jbrowse/worms/jbrowse/',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/jbrowse/worms/jbrowse/',
        target: 'https://main.d341oo3yism9gt.amplifyapp.com/jbrowse/',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/jbrowse/worms/jbrowse/<*>',
        target: 'https://main.d341oo3yism9gt.amplifyapp.com/jbrowse/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/jbrowse/worms/jbrowse2',
        target: 'https://www.alliancegenome.org/jbrowse/worms/jbrowse2/',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/jbrowse/worms/jbrowse2/',
        target: 'https://main.d2jjb0xowet5mr.amplifyapp.com/',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/jbrowse/worms/jbrowse2/<*>',
        target: 'https://main.d2jjb0xowet5mr.amplifyapp.com/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },

      {
        source: '/agr_simplemine.cgi',
        target: 'https://caltech-curation.textpressolab.com/pub/cgi-bin/forms/agr_simplemine.cgi',
        status: amplify.RedirectStatus.REWRITE,
      },

      {
        source: '/jbrowse/<*>',
        target: 'https://prod-alb.alliancegenome.org/jbrowse/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/apollo/<*>',
        target: 'https://prod-alb.alliancegenome.org/apollo/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },

      {
        source: '/alliancemine',
        target: 'https://www.alliancegenome.org/alliancemine/',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/alliancemine/',
        target: 'https://production-alliancemine.alliancegenome.org/alliancemine/',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/alliancemine/<*>',
        target: 'https://production-alliancemine.alliancegenome.org/alliancemine/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/bluegenes',
        target: 'https://www.alliancegenome.org/bluegenes/',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/bluegenes/',
        target: 'https://production-alliancemine.alliancegenome.org:444/bluegenes/alliancemine',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/bluegenes/<*>',
        target: 'https://production-alliancemine.alliancegenome.org:444/bluegenes/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },

      {
        source: '/swagger-ui',
        target: 'https://www.alliancegenome.org/swagger-ui/',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/swagger-ui/',
        target: 'https://prod-alb.alliancegenome.org/swagger-ui/',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/swagger-ui/<*>',
        target: 'https://prod-alb.alliancegenome.org/swagger-ui/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/openapi',
        target: 'https://prod-alb.alliancegenome.org/openapi',
        status: amplify.RedirectStatus.REWRITE,
      },

      {
        source: '/textpresso/sgd',
        target: 'https://www.alliancegenome.org/textpresso/sgd/tpc',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/textpresso/sgd/',
        target: 'https://www.alliancegenome.org/textpresso/sgd/tpc',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/textpresso/sgd/<*>',
        target: 'https://sgd-textpresso.alliancegenome.org/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/textpresso/wb',
        target: 'https://www.alliancegenome.org/textpresso/wb/tpc',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/textpresso/wb/',
        target: 'https://www.alliancegenome.org/textpresso/wb/tpc',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/textpresso/wb/<*>',
        target: 'https://wb-textpresso.alliancegenome.org/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/textpresso/mgi',
        target: 'https://www.alliancegenome.org/textpresso/mgi/tpc',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/textpresso/mgi/',
        target: 'https://www.alliancegenome.org/textpresso/mgi/tpc',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/textpresso/mgi/<*>',
        target: 'https://mgi-textpresso.alliancegenome.org/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/textpresso/zfin',
        target: 'https://www.alliancegenome.org/textpresso/zfin/tpc',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/textpresso/zfin/',
        target: 'https://www.alliancegenome.org/textpresso/zfin/tpc',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/textpresso/zfin/<*>',
        target: 'https://zfin-textpresso.alliancegenome.org/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },
      {
        source: '/textpresso/fb',
        target: 'https://www.alliancegenome.org/textpresso/fb/tpc',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/textpresso/fb/',
        target: 'https://www.alliancegenome.org/textpresso/fb/tpc',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/textpresso/fb/<*>',
        target: 'https://fb-textpresso.alliancegenome.org/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },

      {
        source: '/blast/',
        target: 'https://www.alliancegenome.org/blast',
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      },
      {
        source: '/blast/<*>',
        target: 'https://blast.alliancegenome.org/blast/<*>',
        status: amplify.RedirectStatus.REWRITE,
      },

      { source: '/<*>', target: '/index.html', status: amplify.RedirectStatus.NOT_FOUND_REWRITE },
      { source: '</^[^.]+$/>', target: '/index.html', status: amplify.RedirectStatus.REWRITE },
    ];

    const amplifyApp = new amplify.App(this, 'agr-ui-production', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'alliance-genome',
        repository: 'agr_ui',
        oauthToken: cdk.SecretValue.secretsManager('GithubOauthDevopsToken'),
      }),
      role: iam.Role.fromRoleArn(this, 'AmplifyALBRole', 'arn:aws:iam::100225593120:role/StageAmplifyRole'),
    });

    amplifyApp.addEnvironment('NODE_ENV', 'production');

    const main = amplifyApp.addBranch('main', { autoBuild: true, branchName: 'main', stage: 'PRODUCTION' });

    const domain = amplifyApp.addDomain('alliancegenome.org');
    domain.mapRoot(main);
    domain.mapSubDomain(main, 'www');
    domain.mapSubDomain(main, 'jira');

    for (let path of main_paths) {
      amplifyApp.addCustomRule({
        source: path.source,
        target: path.target,
        status: path.status,
      });
    }
  }
}
