import type { PlasmoMessaging } from '@plasmohq/messaging';

import type { BaseRequest } from '~types/request';
import type { BaseResponse } from '~types/response';
import { makeFullUrl } from '~utils/fetcher';
import { validateDomainWhiteList } from '~utils/storage';

export interface Request extends BaseRequest {
  baseUrl?: string;
  headers?: Record<string, string>;
  method?: string;
  query?: Record<string, string>;
  readHeaders?: Record<string, string>;
  url: string;
  body?: string | FormData | URLSearchParams;
}

type Response = BaseResponse<{
  status: number;
  requestHeaders: Record<string, string>;
  responseHeaders: Record<string, string>;
  body: string | Record<string, unknown>;
}>;

const handler: PlasmoMessaging.MessageHandler<Request, Response> = async (req, res) => {
  try {
    await validateDomainWhiteList(req.body.requestDomain);

    const response = await fetch(makeFullUrl(req.body.url, req.body), {
      method: req.body.method,
      headers: req.body.headers,
      body: req.body.body,
    });
    const contentType = response.headers.get('content-type');
    const body = contentType?.includes('application/json') ? await response.json() : await response.text();

    res.send({
      success: true,
      status: response.status,
      requestHeaders: req.body.headers,
      responseHeaders: Object.fromEntries(response.headers.entries()),
      body,
    });
  } catch (err) {
    res.send({
      success: false,
      error: err.message,
    });
  }
};

export default handler;
